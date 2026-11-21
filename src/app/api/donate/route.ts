import { getSiteContent } from "@/content/store";

export type PledgeRequest = {
  amountCents: number;
  frequency: "one-time" | "monthly";
  designation: string;
  donorName: string;
  email: string;
  phone?: string;
  tribute?: string;
  employerMatch?: boolean;
  employer?: string;
  anonymous?: boolean;
  note?: string;
};

export type Pledge = PledgeRequest & {
  id: string;
  createdAt: string;
  status: "recorded";
};

/**
 * In-memory store. Pledges live until the server restarts — enough for the
 * booster club to try the flow end to end before a payment processor and a
 * database are connected.
 */
const pledges: Pledge[] = [];
/** Cap the store so repeated posts cannot grow memory without bound. */
const MAX_STORED_PLEDGES = 500;
let pledgeCounter = 0;

const MIN_CENTS = 500;
const MAX_CENTS = 2_500_000;

function validate(
  body: unknown,
  designations: { value: string }[],
) {
  const errors: Record<string, string> = {};
  const data = (body ?? {}) as Partial<PledgeRequest>;

  const amountCents = Number(data.amountCents);
  if (!Number.isFinite(amountCents) || !Number.isInteger(amountCents)) {
    errors.amountCents = "Enter a donation amount.";
  } else if (amountCents < MIN_CENTS) {
    errors.amountCents = "The smallest online gift we can process is $5.";
  } else if (amountCents > MAX_CENTS) {
    errors.amountCents =
      "For gifts above $25,000 please contact the booster club directly.";
  }

  if (data.frequency !== "one-time" && data.frequency !== "monthly") {
    errors.frequency = "Choose a one-time or monthly gift.";
  }

  if (!designations.some((option) => option.value === data.designation)) {
    errors.designation = "Choose where your gift should go.";
  }

  if (!data.donorName || data.donorName.trim().length < 2) {
    errors.donorName = "Enter the name that should appear on the receipt.";
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter an email address so we can send a receipt.";
  }

  if (data.employerMatch && !data.employer?.trim()) {
    errors.employer = "Add your employer so we can send the matching paperwork.";
  }

  return { errors, data: data as PledgeRequest };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Expected a JSON body." }, { status: 400 });
  }

  const { designations } = await getSiteContent();
  const { errors, data } = validate(body, designations);
  if (Object.keys(errors).length > 0) {
    return Response.json({ errors }, { status: 422 });
  }

  pledgeCounter += 1;

  const pledge: Pledge = {
    ...data,
    donorName: data.donorName.trim(),
    email: data.email.trim(),
    id: `FBV-${new Date().getFullYear()}-${String(pledgeCounter).padStart(4, "0")}`,
    createdAt: new Date().toISOString(),
    status: "recorded",
  };

  pledges.push(pledge);
  if (pledges.length > MAX_STORED_PLEDGES) {
    pledges.splice(0, pledges.length - MAX_STORED_PLEDGES);
  }

  return Response.json(
    {
      pledge: {
        id: pledge.id,
        amountCents: pledge.amountCents,
        frequency: pledge.frequency,
        designation: pledge.designation,
        createdAt: pledge.createdAt,
        status: pledge.status,
      },
      message:
        "Pledge recorded. Card processing is not connected yet, so a booster club volunteer will follow up to collect the gift.",
    },
    { status: 201 },
  );
}

/** Aggregate only — pledge records hold donor details and are never served. */
export function GET() {
  return Response.json({
    count: pledgeCounter,
    totalCents: pledges.reduce((sum, pledge) => sum + pledge.amountCents, 0),
  });
}

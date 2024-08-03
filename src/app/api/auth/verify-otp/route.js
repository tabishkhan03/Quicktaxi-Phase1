import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function POST(req) {
  try {
    const { phoneNumber, otp } = await req.json();
    const message = await client.messages.create({
      body: `Your OTP code is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    return new Response(
      JSON.stringify({
        messageSid: message.sid,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in OTP:", error);
    return new Response(
      JSON.stringify({ error: "Error in OTP", details: error.message }),
      { status: 500 }
    );
  }
}
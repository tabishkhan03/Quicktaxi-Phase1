import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function POST(req) {
  try {
    const { phoneNumber, otp } = await req.json();

    // if (!customerId || !phoneNumber) {
    //   return new Response(
    //     JSON.stringify({ error: "Customer ID and phone number are required" }),
    //     { status: 400 }
    //   );
    // }

    const message = await client.messages.create({
      body: `Your OTP code is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    // const customer = await prisma.customer.findUnique({
    //   where: { id: customerId },
    // });

    // if (!customer) {
    //   return new Response(JSON.stringify({ error: "Customer not found" }), {
    //     status: 404,
    //   });
    // }

    // Update the phone number
    // const updatedCustomer = await prisma.customer.update({
    //   where: { id: customerId },
    //   data: { phoneNumber: phoneNumber },
    // });

    // console.log(updatedCustomer);

    return new Response(
      JSON.stringify({
        messageSid: message.sid,
        // message: "Phone number updated successfully",
        // customer: updatedCustomer,
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

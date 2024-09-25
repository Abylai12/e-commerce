import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.email",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
export const generateGmail = async (email: string, otp: string) => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<div style="overflow: auto;">
      <div style="margin: 50px auto; width: 70%; padding: 20px 0;">
        <hr style="border: none; border-top: 1px solid #eee;" />

        <p style="font-size: 1.1em;">
          Сайн байна уу? Танд энэ өдрийн мэнд хүргэе.
        </p>

        <p style="margin: 0 auto; padding: 0 10px; text-align: center;">
          Таны нэг удаагийн баталгаажуулах код:
        </p>
        <h2
          style="
            background: #333;
            margin: 10px auto;
            width: max-content;
            padding: 10px;
            color: #fff;
            border-radius: 4px;
          "
        >
          ${otp}
        </h2>
        <p style="margin: 0 auto; width: max-content; padding: 0 10px;">
          энэхүү код нь 5 мин хүчинтэй болно.
        </p>

        <p style="font-size: 0.9em;">
          Хүндэтгэсэн,
          <br />
          E-Commerce ХХК
        </p>
        <hr style="border: none; border-top: 1px solid #eee;" />
      </div>
    </div>`, // html body
  });
};

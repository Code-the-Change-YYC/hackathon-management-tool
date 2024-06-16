import { SES } from "@aws-sdk/client-ses";
import { render } from "@react-email/render";

import { Welcome } from "./Welcome";

const ses = new SES({ region: process.env.AWS_SES_REGION });

export const EmailTemplateList = {
  Welcome: {
    template: Welcome,
    subject: "Registration Confirmation",
  },
};

export const sendEmail = async (
  EmailTemplate: keyof typeof EmailTemplateList,
  props: Record<string, any>,
  toAddress: string,
) => {
  const SelectedEmail = EmailTemplateList[EmailTemplate];
  const emailHtml = render(SelectedEmail.template(props));
  const params = {
    Source: "Hack the Change<no-reply@hackthechangeyyc.ca>",
    Destination: {
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: emailHtml,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: SelectedEmail.subject,
      },
    },
  };

  return await ses.sendEmail(params);
};

import nodemailer from "nodemailer";

/**
 * Send Account Activation
 * @param {*} to
 * @param {*} data
 */
export const sendActivationLink = async (to, data) => {
  // create trams transport
  let transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    // send activation mail
    await transport.sendMail({
      from: `Dashboard<${process.env.MAIL_ID}>`,
      subject: `E-commarce dashboard`,
      to: to,
      text: "check your link",
      html: `<body style="padding: 0; margin: 0"> <center class="wrapper" style=" width: 100%; table-layout: fixed; background-color: #ddd; padding-top: 30px; padding-bottom: 30px; " > <table class="main" style=" background-color: #fff; color: rgb(37, 36, 36); width: 100%; max-width: 600px; margin: 0 auto; border-spacing: 0; font-family: sans-serif; padding: 20px; " > <!-- Header section --> <tr> <td height="16" style="padding: 0; background-color: #fff" class="header-section" > <table width="100%" style="border-spacing: 0"> <tr> <td class="two-collum" style="padding: 0; text-align: left"> <table width="100%" style="border-spacing: 0; border-bottom: 1px solid #ddd" > <tr> <td class="colum1" style=" padding: 0; width: 100%; max-width: 80px; height: 100%; display: inline-block; vertical-align: top; " > <a href="http://localhost:3000/" style="text-decoration: none" > </a> </td> <td class="colum2" style=" padding: 0; width: 100%; max-width: 400px; display: inline-block; vertical-align: top; " > <h4 style="color: #2377f2" class="header-tittle"> Action required: Confirm Your Dashboard Account </h4> </td> </tr> </table> </td> </tr> </table> </td> </tr> <!-- body Section --> <tr> <td class="body-section" style="padding: 0; background-color: #fff"> <table width="100%" style="border-spacing: 0; padding: 0 10px"> <tr> <td class="recever-name" style="padding: 0"> <p style="color: rgb(35, 35, 35)">Hi, ${data.name}</p> </td> </tr> </table> </td> </tr> <tr> <td class="body-section" style="padding: 0; background-color: #fff"> <table width="100%" style="border-spacing: 0; padding: 0 10px"> <tr> <td class="message-name" style="padding: 0"> <p style="color: rgb(35, 35, 35); margin: 0"> You recently Registered for E-commerce dashboard, To complete your E-commerce dashboard registration, please confirm your account </p> </td> </tr> </table> </td> </tr> <tr> <td class="body-section" style="padding: 0; background-color: #fff"> <table width="100%" style="border-spacing: 0; padding: 30px 10px"> <tr> <td class="message-name" style=" padding: 0; margin-top: 15px; display: flex; justify-content: center; " > <a href="${data.link}" style="text-decoration: none"> <button style=" padding: 10px; background-color: #2377f2; color: #fff; border: none; outline: none; border-radius: 4px; cursor: pointer; " > Confirm Your Account </button></a > </td> </tr> </table> </td> </tr> <!-- body Section --> <!-- footer section --> <tr> <td class="body-section" style="padding: 0; background-color: #fff"> <table width="100%" style=" border-spacing: 0; padding: 0 10px; border-top: 1px solid #ddd; margin-top: 40px; " > <tr> <td class="recever-name" style="padding: 0"> <p style="color: rgb(35, 35, 35); font-size: 13px"> This message was sent to <span style="color: #2377f2">${data.email}</span> at your request </p> </td> </tr> </table> </td> </tr> </table> </center> </body>`,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Send Account Activation
 * @param {*} to
 * @param {*} data
 */
export const sentForgotPasswordLink = async (to, data) => {
  // create trams transport
  let transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    // send activation mail
    await transport.sendMail({
      from: `Dashboard<${process.env.MAIL_ID}>`,
      subject: `${data.name} we've made it easy to get back on Dashboard`,
      to: to,
      text: "check your link",
      html: `
            
            <body style="padding:0;margin:0;">
    <center class="wrapper" style="width:100%;table-layout:fixed;background-color:#ffffff;padding-top:30px;padding-bottom:30px;">
      <table class="main" style="background-color:#fff;color:rgb(37, 36, 36); width:100%;max-width:430px; height: 410px; margin:0 auto;border-spacing:0;font-family:sans-serif;padding: 20px;">
        <!-- Header section -->
        <tr>
          <td height="16" style="padding:0;background-color: #fff;" class="header-section">
            <table width="100%" style="border-spacing:0;">
              <tr>
                <td class="two-collum" style="padding:0;text-align:left;">
                  <table width="100%" style="border-spacing:0;">
                    <tr>
                      <td class="colum1" style="padding:0;width:100%;max-width:80px;height:100%;display:inline-block;vertical-align:top;">
                        <a href="http://localhost:3000/" style="text-decoration:none;">
                          <img style="border:0;padding-top: 10px;" width="180"  src="https://ci4.googleusercontent.com/proxy/vHv3tRtE3I_2w6zR6JFt066OaSywcGpzkuO02W6QMIeOfCWNMc-TyEJKxu4mG2hoBsYBLNnCt6VSzhJNl2kOXcZTRdglv3R20xUvvc29ow=s0-d-e1-ft#https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/Otjcwa2eCOF.png" alt="Facebook-logo" border="0">
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- body Section -->
        <tr>
          <td class="body-section" style="padding:0;background-color: #fff;">
            <table width="100%" style="border-spacing:0;padding: 0 10px;">
              <tr>
                <td class="recever-name" style="padding:0;">
                  <p style="color: #565a5c; margin: 0; margin:15px 0px; font-size: 18px;">Hi, ${data.name}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="body-section" style="padding:0;background-color: #fff;">
            <table width="100%" style="border-spacing:0;padding: 0 10px;">
              <tr>
                <td class="message-name" style="padding:0;">
                  <p style="color:#565a5c; margin: 0; line-height: 25px; font-size: 18px;">
                    Sorry to hear you’re having trouble logging into Instagram. We got a message that you forgot your password. If this was you, you can get right back into your account or reset your password now.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="body-section" style="padding:0;background-color: #fff;">
            <table width="100%" style="border-spacing:0;padding: 30px 10px; text-align: center;">
              <tr>
                <td class="message-name" style="padding:0;">
                 <a style="padding: 20px 112px; background-color:#47a2ea; border-radius: 5px; font-size: 18px; font-weight: 600;border: none; outline: none; cursor: pointer;" href=${data.loginAsAccountLink}><button style=" margin-top: 10px; color:#f2fdfd; background-color: #47a2ea; font-size: 18px; font-weight: 600;border: none; outline: none; cursor: pointer;">Log in as ${data.name}</button></a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="body-section" style="padding:0;background-color: #fff;">
            <table width="100%" style="border-spacing:0;padding: 30px 10px; text-align: center;">
              <tr>
                <td class="message-name" style="padding:0;">
                 <a style="padding: 20px 90px; background-color:#47a2ea; border-radius: 5px; font-size: 18px; font-weight: 600;border: none; outline: none; cursor: pointer;" href=${data.resetPassowrdLink}><button style=" margin-top: 10px; color:#f2fdfd; background-color: #47a2ea; font-size: 18px; font-weight: 600;border: none; outline: none; cursor: pointer;">Reset your password</button></a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="body-section" style="padding:0;background-color: #fff;">
            <table width="100%" style="border-spacing:0;padding: 0 10px;">
              <tr>
                <td class="message-name" style="padding:0;">
                  <p style="color:#565a5c; margin: 0; line-height: 25px; font-size: 16px; margin-bottom: 20px;">
                    If you didn’t request a login link or a password reset, you can ignore this message and <a style="color:#47a2ea;" href="https://help.instagram.com/231141655544451">learn more about why you may have received it.</a></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="body-section" style="padding:0;background-color: #fff;">
            <table width="100%" style="border-spacing:0;padding: 0 10px;">
              <tr>
                <td class="message-name" style="padding:0;">
                  <p style="color:#565a5c; margin: 0; line-height: 25px; font-size: 16px;">
                    Only people who know your Instagram password or click the login link in this email can log into your account.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="body-section" style="padding:0;background-color: #fff;">
            <table width="100%" style="border-spacing:0;padding: 0 10px;">
              <tr>
                <td class="message-name" style="padding:0; text-align: center;">
                  <img style="width:50px; height:30px;" src="https://ci4.googleusercontent.com/proxy/EJZbh4o__ilxW-Qeu9CLvNAN7DS93sdYd0ZWHbRbsuZTMeA01I_dPjJ8ksrB2zX5CDoDyOrShH2RhVZy5cghftAAEMZI0T10gEk20cA2OA=s0-d-e1-ft#https://static.xx.fbcdn.net/rsrc.php/v3/y3/r/Bqo9-L659wB.png" alt="">
                  <p style="color: rgb(157, 157, 157); font-weight: 300; margin: 0; font-size: 12px;">© Instagram. Meta Platforms, Inc., 1601 Willow Road, Menlo Park, CA 94025
                    This message was sent to ${data.email} and intended for jannatun1t. Not your account? <a style="color: rgb(157, 157, 157);" href="#"> Remove your email</a> from this account.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- body Section -->
      </table>
    </center>
</body>

            `,
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Send Account Activation
 * @param {*} to
 * @param {*} data
 */
export const sendMail = ({ to, sub, msg }) => {
  // create trams transport
  let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "azam1.english@gmail.com",
      pass: "drdubjcsiffbpoly",
    },
  });

  // send activation mail
  transport.sendMail({
    from: `Wolmart <${to}>`,
    to: to,
    subject: sub,
    text: msg,
  });
};
/**
 * Send Account Activation
 * @param {*} to
 * @param {*} data
 */
export const forgotPasswordSendMail = (to, data) => {
  // create trams transport
  let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "azam1.english@gmail.com",
      pass: "drdubjcsiffbpoly",
    },
  });

  // send activation mail
  transport.sendMail({
    from: `Wolmart <${to}>`,
    to: to,
    subject: "Account Access Info",
    text: `Your account forget password access is email : ${to}`,
    html: `
    <!DOCTYPE html> <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml" > <head> <title></title> <meta content="text/html; charset=utf-8" http-equiv="Content-Type" /> <meta content="width=device-width, initial-scale=1.0" name="viewport" /> <!--[if mso ]><xml ><o:OfficeDocumentSettings ><o:PixelsPerInch>96</o:PixelsPerInch ><o:AllowPNG /></o:OfficeDocumentSettings></xml ><![endif]--> <style> * { box-sizing: border-box; } body { margin: 0; padding: 0; } a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; } #MessageViewBody a { color: inherit; text-decoration: none; } p { line-height: inherit; } .desktop_hide, .desktop_hide table { mso-hide: all; display: none; max-height: 0px; overflow: hidden; } .image_block img + div { display: none; } @media (max-width: 520px) { .desktop_hide table.icons-inner { display: inline-block !important; } .icons-inner { text-align: center; } .icons-inner td { margin: 0 auto; } .image_block img.fullWidth { max-width: 100% !important; } .mobile_hide { display: none; } .row-content { width: 100% !important; } .stack .column { width: 100%; display: block; } .mobile_hide { min-height: 0; max-height: 0; max-width: 0; overflow: hidden; font-size: 0px; } .desktop_hide, .desktop_hide table { display: table !important; max-height: none !important; } } </style> </head> <body style=" margin: 0; background-color: #fff; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none; " > <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; " width="100%" > <tbody> <tr> <td> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f5; " width="100%" > <tbody> <tr> <td> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 500px; margin: 0 auto; " width="500" > <tbody> <tr> <td class="column column-1" style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; " width="100%" > <table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; " width="100%" > <tr> <td class="pad" style=" padding-bottom: 10px; width: 100%; padding-right: 0px; padding-left: 0px; " > <div align="center" class="alignment" style="line-height: 10px" > <img alt="your-logo" src="https://cdn.icon-icons.com/icons2/2699/PNG/512/walmart_logo_icon_170230.png" style=" display: block; height: auto; border: 0; max-width: 125px; width: 100%; " title="your-logo" width="125" /> </div> </td> </tr> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f5; " width="100%" > <tbody> <tr> <td> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000; width: 500px; margin: 0 auto; " width="500" > <tbody> <tr> <td class="column column-1" style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 20px; padding-top: 15px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; " width="100%" > <table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; " width="100%" > <tr> <td class="pad" style=" padding-bottom: 5px; padding-left: 5px; padding-right: 5px; width: 100%; " > <div align="center" class="alignment" style="line-height: 10px" > <img alt="reset-password" class="fullWidth" src="https://logo.com/image-cdn/images/kts928pd/production/6bfa934012816ade62378d0258592ed44ecd43b8-1140x620.png?w=1080&q=72" style=" display: block; height: auto; border: 0; max-width: 350px; width: 100%; " title="reset-password" width="350" /> </div> </td> </tr> </table> <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-2" role="presentation" style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; " width="100%" > <tr> <td class="pad" style="text-align: center; width: 100%" > <h1 style=" margin: 0; color: #393d47; direction: ltr; font-family: Tahoma, Verdana, Segoe, sans-serif; font-size: 25px; font-weight: normal; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; " > <strong>Forgot your password?</strong> </h1> </td> </tr> </table> <table border="0" cellpadding="10" cellspacing="0" class="text_block block-3" role="presentation" style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word; " width="100%" > <tr> <td class="pad"> <div style=" font-family: Tahoma, Verdana, sans-serif; " > <div class="" style=" font-size: 12px; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 18px; color: #393d47; line-height: 1.5; " > <p style=" margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 21px; " > <span style="font-size: 14px" ><span style="" >Not to worry, we got you! </span ><span style="" >Let’s get you a new password.</span ></span > </p> </div> </div> </td> </tr> </table> <table border="0" cellpadding="10" cellspacing="0" class="text_block block-3" role="presentation" style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word; " width="100%" > <tr> <td class="pad"> <div style=" font-family: Tahoma, Verdana, sans-serif; " > <div class="" style=" font-size: 12px; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 18px; color: #393d47; line-height: 1.5; " > <p style=" margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 21px; " > <span style="font-size: 14px" ><span style="" >Varification code : ${data.code}</span > </p> </div> </div> </td> </tr> </table> <table border="0" cellpadding="0" cellspacing="0" class="text_block block-5" role="presentation" style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word; " width="100%" > <tr> <td class="pad" style=" padding-bottom: 5px; padding-left: 10px; padding-right: 10px; padding-top: 10px; " > <div style=" font-family: Tahoma, Verdana, sans-serif; " > <div class="" style=" font-size: 12px; font-family: Tahoma, Verdana, Segoe, sans-serif; text-align: center; mso-line-height-alt: 18px; color: #393d47; line-height: 1.5; " > <p style=" margin: 0; mso-line-height-alt: 19.5px; " > <span style="font-size: 13px" >If you didn’t request to change your password, simply ignore this email.</span > </p> </div> </div> </td> </tr> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f5; " width="100%" > <tbody> <tr> <td> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 500px; margin: 0 auto; " width="500" > <tbody> <tr> <td class="column column-1" style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; " width="100%" > <table border="0" cellpadding="15" cellspacing="0" class="text_block block-1" role="presentation" style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word; " width="100%" > <tr> <td class="pad"> <div style=" font-family: Tahoma, Verdana, sans-serif; " > <div class="" style=" font-size: 12px; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #393d47; line-height: 1.2; " > <p style=" margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px; " > <span style="font-size: 10px" >This link will expire in 24 hours. If you continue to have problems</span ><br /><span style="font-size: 10px" >please feel free to contact us at <a href="mailto:support@youremail.com" rel="noopener" style=" text-decoration: underline; color: #393d47; " target="_blank" title="support@youremail.com" >mdkaydaazam1@gmail.com</a > </span > </p> </div> </div> </td> </tr> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; " width="100%" > <tbody> <tr> <td> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 500px; margin: 0 auto; " width="500" > <tbody> <tr> <td class="column column-1" style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; " width="100%" > <table border="0" cellpadding="0" cellspacing="0" class="html_block block-1" role="presentation" style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; " width="100%" > <tr> <td class="pad"> <div align="center" style=" font-family: Arial, Helvetica Neue, Helvetica, sans-serif; text-align: center; " > <div style=" margin-top: 25px; border-top: 1px dashed #d6d6d6; margin-bottom: 20px; " ></div> </div> </td> </tr> </table> <table border="0" cellpadding="10" cellspacing="0" class="text_block block-2" role="presentation" style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word; " width="100%" > <tr> <td class="pad"> <div style=" font-family: Tahoma, Verdana, sans-serif; " > <div class="" style=" font-size: 12px; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #c0c0c0; line-height: 1.2; " > <p style=" margin: 0; text-align: center; mso-line-height-alt: 14.399999999999999px; " > Duis euismod neque at lacus rutrum, nec suscipit eros tincidunt nterdum et malesuada. </p> <p style=" margin: 0; text-align: center; mso-line-height-alt: 14.399999999999999px; " > Fames ac ante ipsum vestibulum. </p> <p style=" margin: 0; text-align: center; mso-line-height-alt: 14.399999999999999px; " > </p> <p style=" margin: 0; text-align: center; mso-line-height-alt: 14.399999999999999px; " > Your Street 12, 34567 AB City /  info@example.com / (+1) 123 456 789<a href="http://www.example.com" style="" ></a> </p> <p style=" margin: 0; font-size: 12px; text-align: center; mso-line-height-alt: 14.399999999999999px; " > <span style="color: #c0c0c0"> </span> </p> </div> </div> </td> </tr> </table> <table border="0" cellpadding="0" cellspacing="0" class="html_block block-3" role="presentation" style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; " width="100%" > <tr> <td class="pad"> <div align="center" style=" font-family: Arial, Helvetica Neue, Helvetica, sans-serif; text-align: center; " > <div style="height-top: 20px"> </div> </div> </td> </tr> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt" width="100%" > <tbody> <tr> <td> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 500px; margin: 0 auto; " width="500" ></table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <!-- End --> </body> </html>
    `,
  });
};

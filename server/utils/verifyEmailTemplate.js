const verifyEmailTemplate = ({ name, url}) => {
    return  `<div style="font-family: Arial, sans-serif; padding: 20px; max-width: 500px; margin: auto;">
    <h2 style="color: #007bff;">Action Required</h2>
    <p>Hello, ${name}</p>
    <p>Please click the button below to complete your action:</p>
    <a href="${url}" style="display: inline-block; padding: 10px 20px; color: white; background-color: #007bff; 
        text-decoration: none; border-radius: 5px; margin-top: 10px;">
        Verify Now
    </a>
    <p>If you did not request this, you can ignore this email.</p>
    <p>Best Regards, <br> easybuy Team</p>
</div>`
}

const otpEmailTemplate = (name, otp) => {
    return `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #f9f9f9;">
                <h2 style="color: #4CAF50; text-align: center;">Password Reset Request</h2>
                
                <p>Dear <strong>${name}</strong>,</p>
                
                <p>You have requested a password reset. Please use the OTP code below to proceed:</p>
                
                <div style="text-align: center; padding: 15px; font-size: 24px; font-weight: bold; color: #ffffff; background: #4CAF50; border-radius: 5px;">
                ${otp}
                </div>
                
                <p style="margin-top: 20px;">This OTP is valid for <strong>1 hour</strong>. Enter this OTP on the <a href="https://easybit.com" style="color: #4CAF50; text-decoration: none; font-weight: bold;">Easybuy website</a> to reset your password.</p>
                
                <p>If you did not request this, please ignore this email. Your account remains secure.</p>

                <br>
                <p>Thanks,</p>
                <p><strong>Easybuy Team</strong></p>
            </div>
            `;

}

export {verifyEmailTemplate, otpEmailTemplate};
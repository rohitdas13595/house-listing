import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import  styles  from  './login.module.css'

export default function LoginPage() {
  return (
    <main className="flex min-h-screen  items-center  p-24 justify-center">

     
      <div className={`artboard phone-2 w-full  p-10 flex flex-col items-center justify-between border-2 border-gray-300 rounded-3xl ${styles.loginPanel}`   }>
        <InputOTP maxLength={6}  >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <button className="btn btn-primary">Continue</button>
      </div>
    </main>
  );
}

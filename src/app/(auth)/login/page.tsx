import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <div className="my-10">
      <h1 className="text-2xl font-semibold text-center uppercase">
        Đăng nhập
      </h1>
      <div className="flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
}

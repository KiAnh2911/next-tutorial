import RegisterForm from "./register-form";

export default function RegisterPage() {
  return (
    <div className="my-10">
      <h1 className="text-2xl font-semibold text-center uppercase">Đăng kí</h1>
      <div className="flex justify-center">
        <RegisterForm />
      </div>
    </div>
  );
}

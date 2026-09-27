import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z
    .object({
        email: z
            .string()
            .email("Email không đúng định dạng"),

        password: z
            .string()
            .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),

        confirmPassword: z
            .string()
            .min(1, "Vui lòng nhập lại mật khẩu"),
    })
    .refine((data) => data.confirmPassword === data.password, {
        message: "Mật khẩu nhập lại không khớp",
        path: ["confirmPassword"],
    });

function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        alert("Đăng ký thành công!");
    };

    return (
        <div className="mx-auto max-w-md p-6">
            <div className="rounded-xl bg-white p-6 shadow">
                <h2 className="mb-6 text-2xl font-bold">
                    Đăng ký tài khoản
                </h2>

                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="mb-1 block font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            {...register("email")}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        />

                        {errors.email && (
                            <p style={{ color: "red" }}>
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="mb-1 block font-medium">
                            Mật khẩu
                        </label>

                        <input
                            type="password"
                            {...register("password")}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        />

                        {errors.password && (
                            <p style={{ color: "red" }}>
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="mb-1 block font-medium">
                            Nhập lại mật khẩu
                        </label>

                        <input
                            type="password"
                            {...register("confirmPassword")}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        />

                        {errors.confirmPassword && (
                            <p style={{ color: "red" }}>
                                {errors.confirmPassword.message}
                            </p>
                        )}


                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                        {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;
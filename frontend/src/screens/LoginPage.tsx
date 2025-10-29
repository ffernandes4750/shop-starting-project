import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation-yup/loginSchemas.ts";
import { Button, Container, Form } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth.ts";
import { useAppDispatch } from "../redux/hooks.ts";
import { setUser } from "../redux/slices/authSlice.ts";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (user) => {
      dispatch(setUser(user));
      navigate("/");
    },
    onError: (e: any) => {},
  });

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <img
        src="logo.png"
        alt="Elegant model"
        width={100}
        height={100}
        className="mb-2"
      />
      <h2 className="mb-4">Iniciar Sessão</h2>

      <Form onSubmit={handleSubmit((d) => mutateAsync(d))}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            {...register("email")}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3 w-100">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

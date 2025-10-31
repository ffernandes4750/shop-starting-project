import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginCojmosSchema } from "../../validation-yup/loginCojmosShemas.ts";
import { Button, Container, Form } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import { loginCojmos } from "../../api/cojmos.ts";
import { useNavigate } from "react-router-dom";

export default function CojmosLoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginCojmosSchema),
  });

  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => loginCojmos(username, password),
    onSuccess: () => {
      navigate("/cojmos");
    },
    onError: (e: any) => {},
  });

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="mb-5"> COJMOS </h1>
      <h2 className="mb-4 mt-2">Iniciar Sessão</h2>

      <Form onSubmit={handleSubmit((d) => mutateAsync(d))}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Username"
            {...register("username")}
            isInvalid={!!errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username?.message}
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

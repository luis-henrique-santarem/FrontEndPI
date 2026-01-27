import { register } from "./auth";

export async function handleRegisterAndGoToLogin(
  data,
  senhas,
  onSuccess
) {
  const result = await register(data, senhas);

  if (result && onSuccess) {
    onSuccess(); 
  }
}

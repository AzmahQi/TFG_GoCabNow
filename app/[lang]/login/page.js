import LoginForm from "./loginForm";
import { getDictionary } from '@/get-dictionary'
export default async function Login({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  return (
        <LoginForm data={dictionary.loginForm}/>
  );
}

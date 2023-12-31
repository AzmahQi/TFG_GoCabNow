import RegisterForm from "./registerForm";
import { getDictionary } from '@/get-dictionary'

export default async function Register({ params: { lang } }) {
  const dictionary = await getDictionary(lang);

  return (
        <RegisterForm data={dictionary.registerForm} lang={lang}/>
  );
}

import * as S from "../styles/style.js"
import Input from "../components/Input.jsx"
import Button from "../components/Button.jsx"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export default function SignUp() {
  const navigate = useNavigate()
  const URL = `${process.env.REACT_APP_API_URL}/signup`
  const [userSignup, setUserSignup] = useState({
    email: "",
    password: "",
    username: "",
    profile_image: "",
  })
  const [disable, setDisable] = useState(false)

  async function createUser(event) {
    event.preventDefault()
    setDisable(true)
    try {
      await axios.post(URL, userSignup)
      navigate("/")
    } catch ({ response }) {
      alert(response.data)
    }
  }

  return (
    <S.AuthContainer>
      <S.AuthLogo>
        <S.BoxAuthLogo>
          <h1>linkr</h1>
          <span>
            save, share and discover <br /> the best links on the web
          </span>
        </S.BoxAuthLogo>
      </S.AuthLogo>
      <S.AuthForm onSubmit={createUser}>
        <Input
          type="email"
          name="email"
          id="email"
          required
          placeholder="e-mail"
          onChange={(e) =>
            setUserSignup({ ...userSignup, email: e.target.value })
          }
          value={userSignup.email}
          disabled={disable}
          message="Email inválido"
        />
        <Input
          type="password"
          name="password"
          id="password"
          required
          placeholder="password"
          onChange={(e) =>
            setUserSignup({ ...userSignup, password: e.target.value })
          }
          value={userSignup.password}
          disabled={disable}
          minLength="3"
          pattern="^[a-zA-Z0-9]{3,}$"
          message="Apenas letras e números. Tamanho mínimo de 3 caracteres."
        />
        <Input
          type="text"
          name="name"
          id="name"
          required
          placeholder="username"
          onChange={(e) =>
            setUserSignup({ ...userSignup, username: e.target.value })
          }
          value={userSignup.username}
          disabled={disable}
          message="Nome inválido"
        />
        <Input
          type="url"
          name="PictureUrl"
          id="PictureUrl"
          required
          placeholder="picture url"
          onChange={(e) =>
            setUserSignup({ ...userSignup, profile_image: e.target.value })
          }
          value={userSignup.profile_image}
          disabled={disable}
          message="Url inválida"
        />
        <Button type="submit" disabled={disable} text="Sign Up" />
        <Link to="/">
          <span>Switch back to log in</span>
        </Link>
      </S.AuthForm>
    </S.AuthContainer>
  )
}
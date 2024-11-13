import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { CSSProperties, useEffect, useState, KeyboardEvent, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "@/store/actions/auth";
import { RootState } from "@/store/configureStore";

export function SignIn() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const signState = useSelector((state: RootState) => state.auth);


  function handleSignIn(passedEmail: string, passedPassword: string) {
    // Implement your login logic here
    dispatch(userLoginAction({username: passedEmail, password: passedPassword}));
  }
  const handleKeyDown = (e:KeyboardEvent<HTMLInputElement>) => {

    // When enter, sign in
    if (e.key === 'Enter') {
      handleSignIn(email, password)
    }
  }

  useEffect(()=>{
    if(signState.status === 'logged_error'){
      window.alert(`Error: ${signState.error || ''}`);
    }
  }, [signState.status])

  const onSubmit = (e:any) => {
    e.preventDefault()
    handleSignIn(email, password)
  }

  return (
    <div 
      className="m-auto w-full pt-10"
      id="signin-wrapper"
    >
      {/* <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      /> */}
      {/* <div 
        className="absolute inset-0 z-0 h-full w-full bg-black/50" 
      /> */}
      <form onSubmit={onSubmit} className="w-[300px] sm:w-[400px] m-auto">
        <Card 
          // className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4"
          className=""
        >
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
              {/* BITVERSE HRIS */}
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input 
              required
              type="text" 
              label="Username" 
              size="lg" 
              value={email} 
              onChange={(e)=> setEmail(e.target.value)}
              onKeyDown = { handleKeyDown }
            />
            <Input 
              required
              type={showPassword ? "text" : "password" } 
              label="Password" 
              size="lg" 
              value={password} 
              onChange={(e)=> setPassword(e.target.value)}
              onKeyDown = { handleKeyDown }
            />
            <div className="-ml-2.5" >
              <Checkbox onClick={() => setShowPassword(!showPassword)} label="Show Password" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" style={{position: 'relative'}} fullWidth type="submit">
              Sign In
              <div style={spinnerStyle} aria-hidden hidden={(signState.status !== 'logging_in')}>
                {/* <div style={srStyle}></div> */}
              </div>
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              {/* <Link to="/auth/sign-up"> */}
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  <a href="https://bitverseph.com/#/contact-us" target="_blank">Contact Us</a>
                </Typography>
              {/* </Link> */}
            </Typography>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default SignIn;



const spinnerStyle: CSSProperties = {
  width: '1.5rem',
  height: '1.5rem',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%23fff' strokeLinecap='round' strokeLinejoin='round' strokeWidth='10' d='M20 4v5h-.582m0 0a8.001 8.001 0 00-15.356 2m15.356-2H15M4 20v-5h.581m0 0a8.003 8.003 0 0015.357-2M4.581 15H9' /%3E%3C/svg%3E")`,
  animation: 'spin 1s infinite linear',
  position: 'absolute',
  right: '0.625rem',
  top: '0.45rem'
}

const srStyle: CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap',
  borderWidth: '0'
}
import { SignedIn, UserButton } from '@clerk/clerk-react'
import { SignedOut , SignInButton } from '@clerk/nextjs'
import React from 'react'
import { Button } from './ui/button'

function SignIn() {
  return (
    <div>   
        <SignedIn>
            <UserButton/>
        </SignedIn>

        <SignedOut>
          <Button asChild variant="outline">
            <SignInButton />
          </Button>
        </SignedOut>
    </div>
  )
}

export default SignIn
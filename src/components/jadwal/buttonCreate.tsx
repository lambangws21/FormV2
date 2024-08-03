import Link from "next/link";
import { Button } from "../ui/button";

import React from 'react'

const buttonCreate = () => {
  return (
    <Button asChild>
        <Link href={'/form'}>Create</Link>
    </Button>
  )
}

export default buttonCreate
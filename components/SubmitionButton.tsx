'use client'
import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
interface SubmitionButtonProps {
    text: string
}

export default function SubmitionButton({text}: SubmitionButtonProps) {
    const {pending} = useFormStatus()
  return (
    <Button disabled={pending} size="lg" className="h-12 px-8 text-base font-semibold">
        {pending ? 
        <Loader2 className='mr-2 h-5 w-5 animate-spin' />
        : text}
    </Button>
  )
}

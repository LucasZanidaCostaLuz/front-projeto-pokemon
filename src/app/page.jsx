"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Redirecting() {
    const router = useRouter()

    useEffect(() => {
        router.replace("/sobre")
    }, [router])

    return (
        <p>Redirecting...</p>
    )
}
import React from "react"
import Image from "next/image"

type Props = {
  title: string
  description: string
  image?: string
}

const EmptyState = ({ title, description , image="./empty.svg" }: Props) => {
  return (
    <div className="flex justify-center items-center flex-col">
      <Image src={image} alt="empty" width={240} height={240} />
      <div className="flex flex-col gap-y-6 max-w-md mx-auto text-center">
        <h6 className="text-lg font-medium">{title}</h6>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

export default EmptyState

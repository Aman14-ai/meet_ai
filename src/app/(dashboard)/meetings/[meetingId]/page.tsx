import React from 'react'


interface Props {
  params: Promise<{ meetingId: string }>;
}

const page = async({ params }: Props) => {

    const {meetingId} = await params;
  return (
    <div>
      {meetingId}
    </div>
  )
}

export default page

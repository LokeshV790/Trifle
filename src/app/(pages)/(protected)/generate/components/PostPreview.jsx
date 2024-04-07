"use client"
import React from 'react'
import {motion} from "framer-motion"
import Markdown from 'react-markdown'
import { useSession } from 'next-auth/react'

function PostPreview({content}) {
  const {data, status} = useSession();
  return (
    <motion.div className='w-full relative  p-10 top-0 overflow-y-scroll max-h-[calc(100%-120px)] mb-auto'>
        
        <div className=" flex w-full p-4 pb-2 gap-2 font-overused shrink-0">
      <img
        src={data?.user.image}
        className="rounded-full size-10"
        alt=""
      />
      <div className="flex flex-col">
        <div className="flex text-lg  align-top gap-2">
          <span className="leading-4 font-semibold">{data?.user.name}</span>
          <span className="leading-4 font-medium text-grays-300">
            @{data?.user.username}
          </span>
        
        </div>
        <div className="font-roboto mt-2">
          <Markdown>{content}</Markdown>
        </div>
      </div>
    </div>
    </motion.div>
  )
}

export default PostPreview





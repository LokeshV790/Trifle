"use client";
import { icons } from "@/app/utils/icons";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPostAction } from "@/app/mongodb/actions/post.actions";
import { useRouter } from "next/navigation";
import useRevalidate from "@/app/hooks/useRevalidate";
import useToast from "@/app/hooks/useToast";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const Modal = ({ enabled, close, content, image, replyingTo }) => {
  const router = useRouter();
  const { notify } = useToast();
  const postContent = useRef(null);
  const { revalidatePosts } = useRevalidate();
  const [pending, startTransition] = useTransition();
  const [imageUploading, startUploading] = useTransition();
  const [updatedImage, setImage] = useState(null);
  const imageInput = useRef();
  function handleSelectImage() {
    imageInput.current.click();
  }
  useEffect(() => {
    setImage(image);
  }, [image]);
  function handlePost() {
    startTransition(async () => {
      await createPostAction(
        postContent.current.value,
        updatedImage,
        null,
        replyingTo ? replyingTo.id : null
      );
      if (replyingTo) {
        const comments = await axios.post("/api/posts/update/comment", {
          id: replyingTo.id,
        });
        console.log(comments);
      }

      revalidatePosts();
      replyingTo
        ? notify("Your comment has been created successfully")
        : notify("Your post has been posted successfully");
      close();
    });
  }
  async function handleSubmitImage(e) {
    startUploading(async () => {
      const imagefile = e.target.files[0];
      const formData = new FormData();
      formData.append("image", imagefile);
      const res = await axios.post("/api/cloudinary/upload", formData);
      setImage(res.data.result.url);
    });
  }
  return (
    <AnimatePresence>
      {enabled && (
        <div className="flex items-center justify-center size-full fixed z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute  bg-[rgba(0,0,0,0.4)] size-full z-50"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "tween", ease: "circInOut" }}
            className="w-1/2  bg-[rgba(0,0,0,0.9)] backdrop-blur-2xl rounded-3xl z-50 flex flex-col gap-4 p-4 border border-grays-200"
          >
            <div className="flex justify-between">
              <span className="text-2xl font-semibold">
                {replyingTo ? "Post a comment" : "Create a post"}
              </span>

              <button
                onClick={close}
                className="size-10 text-xl p-2 hover:bg-[rgba(255,255,255,0.05)] hover:text-heart_pink-200 transition-colors rounded-xl"
              >
                <div className="rotate-45 size-full flex items-center justify-center">
                  {icons.plus}
                </div>
              </button>
            </div>
            <div className="overflow-hidden  h-fit  flex flex-col gap-2">
              {replyingTo && (
                <div className="font-medium text-text-400 flex items-center gap-2">
                  <div>{icons.arrow_up_left}</div>
                  replying to{" "}
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/user/${replyingTo.username}`}
                      className="text-accent-800 hover:underline flex items-center gap-1"
                    >
                      <Image
                        width={20}
                        height={20}
                        className="rounded-full"
                        src={replyingTo.image}
                      ></Image>
                      @{replyingTo.username}
                    </Link>
                    <div className="size-6"></div>
                  </div>
                </div>
              )}
              <div className="w-full h-44 rounded-2xl overflow-hidden border flex border-grays-200 focus:border-accent-800">
                <textarea
                  placeholder="The body of your post goes here"
                  ref={postContent}
                  defaultValue={content}
                  className=" font-roboto p-4 w-full h-full   overflow-y-scroll  bg-black outline-none resize-none placeholder:text-grays-300"
                ></textarea>
              </div>
              <input
                ref={imageInput}
                onChange={handleSubmitImage}
                className="hidden"
                type="file"
              />
              {updatedImage ? (
                <div className="w-full h-fit shrink-0 overflow-hidden flex gap-2">
                  <Image
                    onClick={handleSelectImage}
                    width={100}
                    height={100}
                    src={updatedImage}
                    alt="your post image"
                    className="rounded-2xl cursor-pointer border-2 bg-grays-100 border-transparent hover:border-accent-900  transition-all"
                  ></Image>
                  <button
                    onClick={() => setImage(null)}
                    className="size-10 mb-auto border border-grays-200 rounded-lg hover:bg-heart_pink-100 hover:text-heart_pink-200 hover:border-heart_pink-200 transition-colors "
                  >
                    
                        <div className="rotate-45">{icons.plus}</div>
                      
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSelectImage}
                  disabled={imageUploading}
                  className={`transition-colors size-20 bg-grays-100 flex items-center justify-center rounded-2xl text-grays-300 border border-grays-200 hover:bg-accent-200 hover:border-accent-800 hover:text-accent-900 ${imageUploading && "pointer-events-none"}`}
                >
                  {imageUploading==true ? <div className="animate-spin">{icons.spinner}</div> : <div>{icons.media}</div>}
                </button>
              )}
              
            </div>
            <div className="flex">
              <button
                onClick={handlePost}
                className="ml-auto bg-violet-600 w-24 py-2 rounded-2xl text-white font-bold hover:bg-accent-800"
                disabled={pending}
              >
                {pending ? (
                  <div className="animate-spin">{icons.spinner}</div>
                ) : (
                  <>
                    <span>Post</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

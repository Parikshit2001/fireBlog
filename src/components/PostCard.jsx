import React, { useState } from 'react'
import appwriteService from "../appwrite/config"
import { FaTrash } from 'react-icons/fa'
import { MdOutlineEdit } from "react-icons/md";
import { Button } from '../components'

function PostCard({$id, title, content, status, myPost=false, className}) {

  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);
  const [newStatus, setNewStatus] = useState(status);
  const [deleted, setDeleted] = useState(false);

  const handleDelete = ($id) => {
    appwriteService.deletePost($id);
    setDeleted(true);
  }

  const handleEdit = (e) => {
    e.preventDefault();
    const updatePost = appwriteService.updatePost($id, {
      title: newTitle,
      content: newContent,
      status: newStatus
    })
    setEdit(false);
  }

  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    setNewStatus(selectedStatus === 'Active');
  };

  return !deleted && (
    <div className={className}>
        <div className='w-full bg-gray-800 rounded-xl p-4 flex justify-between text-white'>
            <div>
              <h2
              className='text-xl font-bold'
              >{newTitle}</h2>
              <p>{newContent}</p>
            </div>
            {myPost && <div className='flex'>
              <div onClick={() => setEdit(prev => !prev)} className='px-5 flex justify-center items-center hover:bg-yellow-500 hover:cursor-pointer rounded-full'>
                  <MdOutlineEdit
                    size={30}
                    color='blue'
                  />
                </div>
                <div onClick={() => handleDelete($id)} className='px-5 flex justify-center items-center hover:bg-yellow-500 hover:cursor-pointer rounded-full'>
                <FaTrash
                  size={30}
                  color='maroon'
                />
              </div>
            </div> }
        </div>
        {edit && <div className='bg-blue-300 rounded-xl mt-2 pt-2 px-8 pb-3'>
            <form onSubmit={(e) => handleEdit(e)}>
              <label htmlFor="">Title: </label>
              <br />
              <input 
                type="text" 
                value={newTitle} 
                onChange={(e) => setNewTitle(e.target.value)}
                className='w-1/2 py-3 rounded-lg mb-3 px-2'
              />
              <br />
              <label htmlFor="">Content: </label>
              <br />
              <textarea 
                type="text" 
                value={newContent} 
                onChange={(e) => setNewContent(e.target.value)}
                className='w-full rounded-lg px-2'
                rows={5}
              />
              <br />
              <div className='pt-3'>
                <select className='w-full p-5 rounded-xl' value={newStatus ? 'Active' : 'InActive'} onChange={handleStatusChange}>
                  <option value="Active">Active</option>
                  <option value="InActive">InActive</option>
                </select>
              </div>
              <br />
              <Button type="submit" className="w-full py-7">
                UPDATE
              </Button>
            </form>
          </div>}
      </div>
  )
}


export default PostCard
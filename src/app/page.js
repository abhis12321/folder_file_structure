"use client"
import { useState } from "react"
import { folder } from './data/folderData.json';
import Folder from "./__components/Folder";

export default function page() {
  const [explorerData , setExplorerData] = useState({...folder});

  const handleNewItemIntoExplorerList = ({ name , isFolder, parentId }) => {
    const id = Object.keys(explorerData).length + 1;
    const object = { isFolder , name , id , parentId , children: [] };
    let newList = explorerData;
    newList[parentId].children = [...newList[parentId]?.children , id];
    newList[id] = object;
    setExplorerData(newList);
    // console.log(newList[parentId].children);
    // console.log({ name , isFolder, parentId })
  }

  console.log(Object.keys(explorerData).length);
  return (
    <div className='p-4'>
      <Folder explorerId={1} explorerData={explorerData} handleNewItemIntoExplorerList={handleNewItemIntoExplorerList}/>
    </div>
  )
}

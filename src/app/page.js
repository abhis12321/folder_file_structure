"use client"
import { useState } from "react"
import { folder } from './data/folderData.json';
import Folder from "./__components/Folder";

export default function page() {
  const [explorerData , setExplorerData] = useState(folder);
  return (
    <div className='p-4'>
      <Folder explorerId={1} explorerData={explorerData} />
    </div>
  )
}

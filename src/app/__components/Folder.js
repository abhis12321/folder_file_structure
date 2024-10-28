import { useState } from "react"

export default function Folder({ explorerId, explorerData , handleNewItemIntoExplorerList}) {
    const [expanded, setExpanded] = useState(false);
    const [showInputForm, setShowInputForm] = useState({ visible: false, isFolder: null });

    const handleExpansion = () => {
        setExpanded(!expanded);
    }

    const handleNewFileOrFolderInputForm = (e, isFolder) => {
        if(showInputForm.visible || expanded) {
            e.stopPropagation();
        }
        setShowInputForm({ visible: true, isFolder });
    }

    const addFileFolderToList = (e) => {
        e.preventDefault();
        handleNewItemIntoExplorerList({ name: e.target.name.value , parentId: explorerId , isFolder: showInputForm.isFolder });
        setShowInputForm({ visible: false, isFolder: false });
    }

    // console.log(explorerData[explorerId])
    if (explorerData[explorerId]?.isFolder)
        return (
            <div className="flex flex-col gap-1">
                <div className="max-w-[400px] px-2 py-1 bg-blue-300 hover:bg-blue-400 active:bg-sky-300 rounded flex gap-1 font-bold items-center justify-between" onClick={handleExpansion}>
                    <div className="">📁 {explorerData[explorerId]?.name}</div>
                    <div className="text-xs font-medium flex items-center justify-center gap-1">
                        <div className="py-2 w-[60px] text-center rounded-md ring-1 ring-black bg-red-200 cursor-pointer hocer:bg-violet-200 hover:bg-red-300" onClick={(e) => handleNewFileOrFolderInputForm(e, true)}>Folder+</div>
                        <div className="py-2 w-[60px] text-center rounded-md ring-1 ring-black bg-red-200 cursor-pointer hocer:bg-violet-200 hover:bg-red-300" onClick={(e) => handleNewFileOrFolderInputForm(e, false)}>File+</div>
                    </div>
                </div>
                <div className={`pl-8 flex flex-col gap-1 ${!expanded && "hidden"}`}>
                    {
                        showInputForm.visible &&
                        <form className="" onSubmit={addFileFolderToList}>
                            { showInputForm.isFolder ? "📁  " : "📝  " }
                            <input type="text" name="name" className="px-2 py-1 font-semibold ring-1 ring-black rounded-md outline-none" autoFocus onBlur={() => setShowInputForm({ ...showInputForm, visible: false })} />
                        </form>
                    }
                    {
                        explorerData[explorerId]?.children?.map((childExplorerId) => <Folder key={childExplorerId} explorerId={childExplorerId} explorerData={explorerData} handleNewItemIntoExplorerList={handleNewItemIntoExplorerList}/>)
                    }
                </div>
            </div>
        )
    else
        return (
            <div className="max-w-[400px] p-2 bg-indigo-200 rounded flex gap-1 font-medium text-sm">
                <div className="">📝 {explorerData[explorerId]?.name}</div>
            </div>
        )
}

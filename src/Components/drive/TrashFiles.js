import React, {useEffect, useState} from 'react'
import {db} from '../../firebase';
import './Files.css'

function TrashFiles({file, data}) {
    const name = file.name
    const ext = name.split('.').pop().toLowerCase();
    let [clickedFile,setclickedFile] = useState(file);
    let contextMenu;
    var url;
    if (ext == 'pdf') {
        url = "https://cdn-icons-png.flaticon.com/512/337/337946.png"
    } else if (ext.slice(0, 2) == 'mp') {
        url = "https://cdn2.iconfinder.com/data/icons/music-outlined-pixel-perfect/64/music-16-512.png"
    } else if ([
        'jpg',
        'jpeg',
        'png',
        'gif',
        'jfif',
        'tiff',
        'tif'
    ].includes(ext)) {
        url = file.url
    } else {
        url = "https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png"
    }

    // !---------------!//
    const restore = () => {
        db.bin.doc(clickedFile.id).delete().then(function () {
            console.log(clickedFile)
            db.files.add({
                url: clickedFile.url,
                name: clickedFile.name,
                userId: clickedFile.userId,
                FolderId: clickedFile.FolderId,
                Time: clickedFile.Time
            })
        })
        disableRightMenu()
    }

    // !---------------!//
    const delfor = () => {

        db.bin.doc(clickedFile.id).delete().then(function () {})

        disableRightMenu()
    }
    

    // !------------------------!
    const disableRightMenu = () =>{
        contextMenu.classList.remove("visible");

    }

    // !-------------------!
    useEffect(() => {
        contextMenu = document.getElementById("context-menu");
        const scope = document.querySelectorAll(".Trashcontainer");
        const bodyScope = document.querySelector("body");
        const fileScope = document.querySelector(".container .linkstyle");
        console.log(scope)
        const normalizePozition = (mouseX, mouseY) => { // ? compute what is the mouse position relative to the container element (scope)
            let {left: scopeOffsetX, top: scopeOffsetY} = bodyScope.getBoundingClientRect();

            scopeOffsetX = scopeOffsetX < 0 ? 0 : scopeOffsetX;
            scopeOffsetY = scopeOffsetY < 0 ? 0 : scopeOffsetY;

            const scopeX = mouseX - scopeOffsetX;
            const scopeY = mouseY - scopeOffsetY;

            // ? check if the element will go out of bounds
            const outOfBoundsOnX = scopeX + contextMenu.clientWidth > bodyScope.clientWidth;

            const outOfBoundsOnY = scopeY + contextMenu.clientHeight > bodyScope.clientHeight;

            let normalizedX = mouseX;
            let normalizedY = mouseY;

            // ? normalize on X
            if (outOfBoundsOnX) {
                normalizedX = scopeOffsetX + bodyScope.clientWidth - contextMenu.clientWidth;
            }

            // ? normalize on Y
            if (outOfBoundsOnY) {
                normalizedY = scopeOffsetY + bodyScope.clientHeight - contextMenu.clientHeight;
            }

            return {normalizedX, normalizedY};
        };
        scope.forEach((imagePos)=>
            
            imagePos.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            let obj = imagePos.getAttribute("data")
            console.log(file)
            let ob = JSON.parse(obj);
            setclickedFile(ob);
            console.log(clickedFile)

            const {clientX: mouseX, clientY: mouseY} = event;

            const {normalizedX, normalizedY} = normalizePozition(mouseX, mouseY);

            contextMenu.classList.remove("visible");

            contextMenu.style.top = `${normalizedY}px`;
            contextMenu.style.left = `${normalizedX}px`;

            setTimeout(() => {
                contextMenu.classList.add("visible");
            });
            })
        )
        

        bodyScope.addEventListener("click", (e) => { // ? close the menu if the user clicks outside of it
            if (e.target.offsetParent != contextMenu) {
                contextMenu.classList.remove("visible");
            }
            
        });
    })

    return (
        <div className='Trashcontainer' data={JSON.stringify(file)}>
            <div id="context-menu">
            <div className="opt">
                    <div className='item' onClick={restore}>
                        <span >
                        <i class="fas fa-undo"></i>Restore</span>
                    </div>
                    <div className='item' onClick={delfor}>
                        <span >
                        <i class="fas fa-trash-alt"></i>Delete forever</span>
                    </div>
                </div>
             </div>
            <div> </div>

            <a href={
                    file.url
                }
                target="_blank"
                className='linkstyle' 
                >
                <div className='fileimage'>
                    <img src={url}
                        id="rightDisable"/>
                    <div className='filename'>
                        {
                        name.length > 15 ? name.slice(0, 15) + '...' : name
                    } </div>
                </div>
            </a>

        </div>
    )
}

export default TrashFiles

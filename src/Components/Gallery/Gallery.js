import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./styles/Gallery.css";
import { signOut} from 'firebase/auth';
import {database} from '../FirebaseConfig';
import { useNavigate } from 'react-router-dom';

const SuperStars = [
  {
    id: "Ron",
    name: "Ronaldo",
    thumb: "/assets/Images/Cristiano-Ronaldo.png",
  },
  {
    id: "ona",
    name: "onana",
    thumb: "/assets/Images/onana.png",
  },
  {
    id: "osi",
    name: "osimhen",
    thumb: "/assets/Images/victor-osimhen.png",
  },
  {
    id: "ney",
    name: "neymar",
    thumb: "/assets/Images/Neymar.png",
  },
  {
    id: "sal",
    name: "Salah",
    thumb: "/assets/Images/Salah.png",
  },
  {
    id: "Hal",
    name: "Halland",
    thumb: "/assets/Images/Halland.png",
  },
  {
    id: "mba",
    name: "mbappe",
    thumb: "/assets/Images/mbappe.png",
  },
  {
    id: "kel",
    name: "kelvin",
    thumb: "/assets/Images/kelvin-debruyne.png",
  },
  {
    id: "ben",
    name: "benzema",
    thumb: "/assets/Images/benzema.png",
  },
];

function Gallery() {
    const [superStars, setSuperStars] = useState(SuperStars);
    const [searchInput, setSearchInput] = useState('');
  
    const onDragEnd = (event) => {
      const { active, over } = event;
      if (active.id === over.id) {
        return;
      }
      setSuperStars((superStars) => {
        const oldIndex = superStars.findIndex(
          (SuperStar) => SuperStar.id === active.id
        );
        const newIndex = superStars.findIndex(
          (SuperStar) => SuperStar.id === over.id
        );
        const newSuperStars = arrayMove(superStars, oldIndex, newIndex);
        return newSuperStars;
      });
    };
  
    const SortableUser = ({ SuperStar }) => {
      const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: SuperStar.id });
  
      const style = {
        transition,
        transform: CSS.Transform.toString(transform),
      };
  
      return (
        <div className="ImageName" ref={setNodeRef} style={style} {...attributes} {...listeners}>
          <img
            className="imgSuperstar"
            src={SuperStar.thumb}
            alt={`${SuperStar.name} Thumb`}
          />
          <p>{SuperStar.name}</p>
        </div>
      );
    };

    const filteredSuperStars = superStars.filter((SuperStar) => 
        SuperStar.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    const history = useNavigate()

    const handleClick = () => {
        signOut(database).then(val=>{
            console.log(val, "val")
            history('/')
        })
    }
  
    return (
    <div>
        <div className="search-bar">
            <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            />
      </div>
      <div className="gallery-container">
        <div className="superstar">
          <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext
            //   items={superStars}
            items={filteredSuperStars}
              strategy={verticalListSortingStrategy}
            >
              {/* {superStars.map((SuperStar) => { */}
              {filteredSuperStars.map((SuperStar) => {
                return <SortableUser key={SuperStar.id} SuperStar={SuperStar} />;
              })}
            </SortableContext>
          </DndContext>
        </div>
      </div>
      <div className="butt" >
      <button onClick={handleClick} >Logout</button>
      </div>
      
    </div>
    );
  }
  
  export default Gallery;

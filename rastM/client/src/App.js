import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react'

const itemsFromBack = [
  { id: uuidv4(), content: '1st Task' },
  { id: uuidv4(), content: '2nd Task' },
  { id: uuidv4(), content: '3rd Task' }
]

const columnsFromBack = {
    [uuidv4()]: {
      name: 'ToDo',
      items: [itemsFromBack]
    },
  }


function App() {
  const [columns, setColumns] = useState(columnsFromBack)
  return (
    <div className="App" stle={{display:'flex', justifyContent:'center', textAlign:'center', height:'100%'}}>
      <DragDropContext onDragEnd={result => console.log(result)}>
        {Object.entries(columns).map(([id, column]) =>{
          return (
            <Droppable droppableId={id}>
              {(provided, snapshot) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                      padding: 4,
                      width: 250,
                      minHeight: 500,
                      margin: 'auto'
                    }}
                  >
                    {column.items.map((item, index)=>{
                      return (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => {
                            return (
                              <div 
                                ref={provided.innerRef}
                                {...provided.dragHandleProps}
                                {...provided.dragHandleProps}
                                style={{
                                  userSelect:'none',
                                  padding: 16,
                                  margin: '0 0 8px 0',
                                  minHeight: '50',
                                  backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                  color: 'White',
                                  ...provided.draggableProps.styles
                                }}  
                              >
                                {item.content}
                              </div>
                            )
                          }}
                        </Draggable>
                      )
                    })}
                  </div>
                )
              }}
            </Droppable>
          )
        })}
      </DragDropContext>
    </div>
  );
}

export default App;

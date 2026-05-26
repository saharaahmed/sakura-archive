const FLOWER_POSITIONS = [
  { left: "91%", top: "70%" },
  { left: "62%", top: "10%" },  
  { left: "21%", top: "8%" },  
  { left: "46%", top: "15%" }, 
  { left: "19%", top: "28%" },  

  { left: "1%", top: "38%" },  
  { left: "8%", top: "47%" }, 
  { left: "57%", top: "24%" },
  { left: "82%", top: "30%" },
  { left: "70%", top: "38%" }, 

  { left: "60%", top: "45%" }, 
  { left: "33%", top: "12%" }, 
  { left: "97%", top: "32%" },  
  { left: "9%", top: "62%" },  
  { left: "6%", top: "76%" },

  { left: "22%", top: "71%" },  
  { left: "12%", top: "70%" }, 
  { left: "98%", top: "41%" },  
  { left: "95%", top: "47%" },  
  { left: "93%", top: "52%" },

  { left: "81%", top: "40%" },
  { left: "75%", top: "47%" },
  { left: "75%", top: "66%" },
  { left: "84%", top: "59%" }, 
  { left: "70%", top: "59%" }, 

  { left: "16%", top: "38%" },  
  { left: "34%", top: "40%" }, 
  { left: "9%", top: "19%" },
  { left: "18%", top: "17%" },
  { left: "31%", top: "23%" },

  { left: "21%", top: "62%" },  
  { left: "28%", top: "44%" }, 
  { left: "74%", top: "27%" },
  { left: "68%", top: "28%" },
  { left: "48%", top: "28%" },

] // total of 35 flowers that show on the tree
// all positions are randomised and fixed
// entries after 35 are added to the db BUT won't always be shown on the tree

const FLOWER_COLOURS = {
  surprises: { petal: "#f9c8d8", center: "#e87a9a" },
  design: { petal: "#c8d8f9", center: "#7a9ae8" },
  tips: { petal: "#c8f9d8", center: "#7ae8a0" },
  suggestion: { petal: "#f9e8c8", center: "#e8b87a" },
  other: { petal: "#e8c8f9", center: "#d87ae8" },
}

function Flower({ position, upload, onClick, isActive }) {
  const colours = FLOWER_COLOURS[upload?.type] || FLOWER_COLOURS.tips
  const size = isActive ? 44 : 36

  return (
    <div
      onClick={() => onClick(upload)}
      style={{
        position: "absolute",
        left: position.left,
        top: position.top,
        transform: "translate(-50%, -50%)",
        width: size,
        height: size,
        cursor: "pointer",
        transition: "width 0.15s, height 0.15s",
        zIndex: isActive ? 10 : 1,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 44 44"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* petals for flowers */}
        <circle cx="22" cy="9"  r="8" fill={colours.petal} opacity="0.9" />
        <circle cx="22" cy="35" r="8" fill={colours.petal} opacity="0.9" />
        <circle cx="9"  cy="22" r="8" fill={colours.petal} opacity="0.9" />
        <circle cx="35" cy="22" r="8" fill={colours.petal} opacity="0.9" />
        <circle cx="12" cy="12" r="7" fill={colours.petal} opacity="0.75" />
        <circle cx="32" cy="12" r="7" fill={colours.petal} opacity="0.75" />
        <circle cx="12" cy="32" r="7" fill={colours.petal} opacity="0.75" />
        <circle cx="32" cy="32" r="7" fill={colours.petal} opacity="0.75" />
        {/* centre of flower */}
        <circle cx="22" cy="22" r="9" fill={colours.center} />
        {/* active ring */}
        {isActive && (
          <circle cx="22" cy="22" r="20" fill="none" stroke={colours.center} strokeWidth="2" opacity="0.5" />
        )}
      </svg>
    </div>
  )
}

function EmptyBud({ position }) {
  return (
    <div style={{
      position: "absolute",
      left: position.left,
      top: position.top,
      transform: "translate(-50%, -50%)",
      width: 12,
      height: 12,
      borderRadius: "50%",
      border: "1.5px dashed #e8b8c4",
      opacity: 0.6,
    }} />
  )
}

export default function Tree({ uploads, setActiveUpload, activeUpload }) {
  // randomly displays flowers from uploads.
  const shuffled = [...(uploads || [])].sort(() => Math.random() - 0.5)
  const visibleFlowers = shuffled.slice(0, FLOWER_POSITIONS.length)
  const emptySlots = FLOWER_POSITIONS.slice(visibleFlowers.length)

  return (
    <div style={{
      position: "relative",
      width: "48%",
      aspectRatio: "1 / 1", // to keep the aspect ratio of my tree image.
      maxHeight: "600px",
      margin: "0 auto",
    }}>
      <img
        src="/tree.png"
        alt="cherry blossom tree"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",  // scales it down tree
          display: "block",
        }}
      />

      {/* flowers mapped to uploads */}
      {visibleFlowers.map((upload, i) => (
        <Flower
          key={upload.id}
          position={FLOWER_POSITIONS[i]}
          upload={upload}
          onClick={setActiveUpload}
          isActive={activeUpload?.id === upload.id}
        />
      ))}

      {/* dashed buds for empty slots */}
      {emptySlots.map((pos, i) => (
        <EmptyBud key={i} position={pos} />
      ))}
    </div>
  )
}
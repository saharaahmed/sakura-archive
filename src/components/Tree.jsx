const FLOWER_POSITIONS = [
  { left: "91%", top: "70%" },   // top centre fork
  { left: "58%", top: "4%" },   // top centre right tip
  { left: "38%", top: "12%" },  // upper left cluster
  { left: "30%", top: "18%" },  // mid left branch
  { left: "18%", top: "28%" },  // far left branch tip
  { left: "12%", top: "35%" },  // low left tip
  { left: "22%", top: "42%" },  // low left inner
  { left: "70%", top: "22%" },  // right branch tip
  { left: "80%", top: "30%" },  // far right tip
  { left: "75%", top: "38%" },  // right lower tip
  { left: "65%", top: "44%" },  // right inner
  { left: "45%", top: "30%" },  // centre inner left
  { left: "55%", top: "35%" },  // centre inner right
  { left: "14%", top: "58%" },  // bottom left branch
  { left: "20%", top: "65%" },  // bottom left tip
]

const FLOWER_COLORS = {
  tip:        { petal: "#f9c8d8", center: "#e87a9a" },
  design:     { petal: "#c8d8f9", center: "#7a9ae8" },
  secret:     { petal: "#c8f9d8", center: "#7ae8a0" },
  suggestion: { petal: "#f9e8c8", center: "#e8b87a" },
  other:      { petal: "#e8c8f9", center: "#d87ae8" },
}

function Flower({ position, upload, onClick, isActive }) {
  const colors = FLOWER_COLORS[upload?.type] || FLOWER_COLORS.tip
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
        {/* petals */}
        <circle cx="22" cy="9"  r="8" fill={colors.petal} opacity="0.9" />
        <circle cx="22" cy="35" r="8" fill={colors.petal} opacity="0.9" />
        <circle cx="9"  cy="22" r="8" fill={colors.petal} opacity="0.9" />
        <circle cx="35" cy="22" r="8" fill={colors.petal} opacity="0.9" />
        <circle cx="12" cy="12" r="7" fill={colors.petal} opacity="0.75" />
        <circle cx="32" cy="12" r="7" fill={colors.petal} opacity="0.75" />
        <circle cx="12" cy="32" r="7" fill={colors.petal} opacity="0.75" />
        <circle cx="32" cy="32" r="7" fill={colors.petal} opacity="0.75" />
        {/* centre */}
        <circle cx="22" cy="22" r="9" fill={colors.center} />
        {/* active ring */}
        {isActive && (
          <circle cx="22" cy="22" r="20" fill="none" stroke={colors.center} strokeWidth="2" opacity="0.5" />
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
  // randomly pick which uploads get flowers — keeps it fresh on filter change
  const shuffled = [...uploads].sort(() => Math.random() - 0.5)
  const visibleFlowers = shuffled.slice(0, FLOWER_POSITIONS.length)
  const emptySlots = FLOWER_POSITIONS.slice(visibleFlowers.length)

  return (
    <div style={{
      position: "relative",
      width: "48%",
      // this keeps the wrapper the same aspect ratio as your 2048x2048 image
      aspectRatio: "1 / 1",
      maxHeight: "600px",
      margin: "0 auto",
    }}>
      <img
        src="/tree.png"
        alt="cherry blossom tree"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",  // scales it down, preserves ratio, no cropping
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
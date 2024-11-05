type GhostProps = {
    color: string
    position: number
  }
  
  export const Ghost = ({ color, position }: GhostProps) => {
    return (
      <div
        className="absolute bottom-8 w-8 h-8"
        style={{ 
          left: `${position}%`,
          background: color,
          borderRadius: '40% 40% 0 0',
          boxShadow: 'inset -2px -2px 0 0 rgba(0,0,0,0.2)'
        }}
      >
        <div className="absolute left-1 top-2 w-2 h-2 bg-white rounded-full">
          <div className="absolute right-0 top-1 w-1 h-1 bg-black rounded-full" />
        </div>
        <div className="absolute right-1 top-2 w-2 h-2 bg-white rounded-full">
          <div className="absolute right-0 top-1 w-1 h-1 bg-black rounded-full" />
        </div>
      </div>
    )
  }
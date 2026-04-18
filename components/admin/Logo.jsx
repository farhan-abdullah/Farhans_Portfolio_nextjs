export default function Logo() {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'.75rem', padding:'1.25rem 1rem', borderBottom:'1px solid hsl(217 33% 16%)', background:'hsl(222 47% 6%)' }}>
      <div style={{ width:'2.25rem', height:'2.25rem', background:'linear-gradient(135deg,#00d4aa,#0d9488)', borderRadius:'.65rem', display:'flex', alignItems:'center', justifyContent:'center', color:'hsl(222 47% 6%)', fontWeight:800, fontSize:'1.1rem', flexShrink:0, boxShadow:'0 0 0 1px rgba(0,212,170,.3),0 4px 12px rgba(0,212,170,.2)' }}>
        F
      </div>
      <div style={{ lineHeight:1.1 }}>
        <div style={{ fontSize:'1rem', fontWeight:700, letterSpacing:'-.02em', color:'hsl(210 40% 98%)' }}>Farhan</div>
        <div style={{ fontSize:'.7rem', fontWeight:600, color:'#00d4aa', letterSpacing:'.04em' }}>Admin Panel</div>
      </div>
    </div>
  );
}

import React, { useMemo } from "react";

type Side = "left" | "right";

export type RebalanceNode = {
  id: string;        // label / key
  value: number;     // sum of incoming (right) or outgoing (left)
  color: string;     // node color
};

export type RebalanceLink = {
  source: number;    // index in leftNodes
  target: number;    // index in rightNodes
  value: number;     // absolute value (same Einheit wie nodes.value)
  colorFrom?: string;
  colorTo?: string;
};

export type MiniSankeyProps = {
  width?: number;
  height?: number;
  padding?: number;
  bandGap?: number;      // vertikaler Abstand zwischen Bändern in derselben Spalte
  cornerRadius?: number; // abgerundete Ecken der Knoten
  leftTitle?: string;
  rightTitle?: string;
  leftNodes: RebalanceNode[];
  rightNodes: RebalanceNode[];
  links: RebalanceLink[];
  background?: string;
  fontFamily?: string;
};

export const MiniSankey: React.FC<MiniSankeyProps> = ({
  width = 860,
  height = 120,
  padding = 16,
  bandGap = 4,
  cornerRadius = 8,
  leftTitle = "Ist-Portfolio",
  rightTitle = "Soll-Portfolio",
  leftNodes,
  rightNodes,
  links,
  background = "transparent",
  fontFamily = "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
}) => {
  // Maße
  const nodeWidth = 14;          // Breite der Balken links/rechts
  const linkGapX = 10;           // horizontaler Abstand Balken→Band
  const titleGapY = 18;          // Abstand der Titelzeile zum Diagramm
  const H = height - titleGapY;  // effektive Diagrammhöhe

  // Gesamtsummen
  const totalLeft = useMemo(
    () => leftNodes.reduce((s, n) => s + n.value, 0),
    [leftNodes]
  );
  const totalRight = useMemo(
    () => rightNodes.reduce((s, n) => s + n.value, 0),
    [rightNodes]
  );

  // Skala: Wert → Pixelhöhe
  const scale = (v: number, side: Side) => {
    const total = side === "left" ? totalLeft : totalRight;
    // verfügbare Höhe abzüglich kleiner Spalten-Luft
    return total > 0 ? (H - bandGap * ( (side === "left" ? leftNodes.length : rightNodes.length) - 1)) * (v / total) : 0;
  };

  // Knoten-Layout (y-Start jeder Box)
  const leftBoxes = useMemo(() => {
    let y = padding + titleGapY;
    return leftNodes.map((n) => {
      const h = scale(n.value, "left");
      const box = { x: padding, y, w: nodeWidth, h, color: n.color, id: n.id };
      y += h + bandGap;
      return box;
    });
  }, [leftNodes]);

  const rightBoxes = useMemo(() => {
    let y = padding + titleGapY;
    return rightNodes.map((n) => {
      const h = scale(n.value, "right");
      const box = { x: width - padding - nodeWidth, y, w: nodeWidth, h, color: n.color, id: n.id };
      y += h + bandGap;
      return box;
    });
  }, [rightNodes, width]);

  // Für jede Box wird die vertikale "Flussposition" fortgeschrieben,
  // damit Links segmentweise untereinander gestapelt werden.
  const leftOffsets = useMemo(() => leftNodes.map(() => 0), [leftNodes]);
  const rightOffsets = useMemo(() => rightNodes.map(() => 0), [rightNodes]);

  // Link-Geometrie berechnen
  type LinkGeom = {
    id: string;
    path: string;
    thickness: number;
    gradId: string;
    colorFrom: string;
    colorTo: string;
  };

  const linkGeoms = useMemo<LinkGeom[]>(() => {
    const geoms: LinkGeom[] = [];
    links.forEach((L, i) => {
      const srcBox = leftBoxes[L.source];
      const dstBox = rightBoxes[L.target];

      const t = Math.max(1, Math.round(scale(L.value, "left"))); // Banddicke in px
      const srcY0 = srcBox.y + leftOffsets[L.source];
      const dstY0 = dstBox.y + rightOffsets[L.target];

      // Offsets erhöhen (Stapeln)
      leftOffsets[L.source] += t;
      rightOffsets[L.target] += t;

      // Start-/Endkoordinaten (Band wird als „Rundband“ mit parallelen Cubic-Beziers gezeichnet)
      const x0 = srcBox.x + srcBox.w;
      const x1 = dstBox.x;
      const y0 = srcY0 + t / 2;
      const y1 = dstY0 + t / 2;

      // Steuerpunkte für sanften S‑Curve
      const dx = Math.max(24, (x1 - x0 - linkGapX * 2) * 0.5);
      const c0x = x0 + linkGapX + dx * 0.2;
      const c1x = x1 - linkGapX - dx * 0.2;

      // Außenkante oben
      const yTop0 = y0 - t / 2;
      const yTop1 = y1 - t / 2;
      // Außenkante unten
      const yBot0 = y0 + t / 2;
      const yBot1 = y1 + t / 2;

      const top = `M ${x0 + linkGapX},${yTop0} C ${c0x},${yTop0} ${c1x},${yTop1} ${x1 - linkGapX},${yTop1}`;
      const bottom = `C ${c1x},${yBot1} ${c0x},${yBot0} ${x0 + linkGapX},${yBot0}`;
      const path = `${top} ${bottom} Z`;

      const colorFrom = L.colorFrom ?? leftNodes[L.source].color;
      const colorTo = L.colorTo ?? rightNodes[L.target].color;
      const gradId = `grad-${i}`;

      geoms.push({
        id: `link-${i}`,
        path,
        thickness: t,
        gradId,
        colorFrom,
        colorTo,
      });
    });
    return geoms;
  }, [links, leftBoxes, rightBoxes, leftNodes, rightNodes]);

  return (
    <svg width={width} height={height} style={{ background }}>
      <defs>
        {linkGeoms.map((g) => (
          <linearGradient id={g.gradId} key={g.gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={g.colorFrom} />
            <stop offset="100%" stopColor={g.colorTo} />
          </linearGradient>
        ))}
      </defs>

      {/* Titel */}
      <text x={padding} y={14} fontFamily={fontFamily} fontSize={14} fill="#555">{leftTitle}</text>
      <text x={width - padding} y={14} fontFamily={fontFamily} fontSize={14} textAnchor="end" fill="#555">{rightTitle}</text>

      {/* Links (Bänder) */}
      {linkGeoms.map((g) => (
        <path key={g.id} d={g.path} fill={`url(#${g.gradId})`} opacity={0.9} />
      ))}

      {/* Knoten links */}
      {leftBoxes.map((b, i) => (
        <g key={`l-${i}`}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={cornerRadius} ry={cornerRadius} fill={b.color} />
        </g>
      ))}

      {/* Knoten rechts */}
      {rightBoxes.map((b, i) => (
        <g key={`r-${i}`}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={cornerRadius} ry={cornerRadius} fill={b.color} />
        </g>
      ))}
    </svg>
  );
};

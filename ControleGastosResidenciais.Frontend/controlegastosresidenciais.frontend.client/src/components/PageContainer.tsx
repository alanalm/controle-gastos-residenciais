import { ReactNode, CSSProperties } from "react";

type PageContainerProps = {
    title: string;
    children: ReactNode;
};

export default function PageContainer({ title, children }: PageContainerProps) {
    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>{title}</h1>
            {children}
        </div>
    );
}

/* ===== Container ===== */
const containerStyle: CSSProperties = {
    backgroundColor: "#1f2937",
    color: "#f9fafb",
    padding: "24px",
    borderRadius: "8px",
    maxWidth: "1100px",
    margin: "0 auto",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    fontFamily: "sans-serif",
};

const titleStyle: CSSProperties = {
    marginBottom: "16px",
};

/* ===== Form Styles ===== */
export const formStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "24px",
    alignItems: "center",
};

export const inputStyle: CSSProperties = {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #374151",
    backgroundColor: "#111827",
    fontSize: "14px",
    color: "#f9fafb",
    minWidth: "120px",
    maxWidth: "250px",
    flex: "1",
};

export const selectStyle: CSSProperties = {
    ...inputStyle,
};

export const buttonStyle: CSSProperties = {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#2563EB",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    height: "40px",
};

/* ===== Table Styles ===== */
export const tableStyle: CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#111827",
    color: "#f9fafb",
};

export const thStyle: CSSProperties = {
    borderBottom: "2px solid #374151",
    padding: "12px",
    textAlign: "left",
    verticalAlign: "middle",
};

export const tdStyle: CSSProperties = {
    borderBottom: "1px solid #374151",
    padding: "12px",
    textAlign: "left",
    verticalAlign: "middle",
};

/* ===== Action Buttons ===== */
export const deleteButtonStyle: CSSProperties = {
    padding: "4px 8px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#EF4444", 
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "13px",
};

// Botão principal (Adicionar, Atualizar, etc)
export const actionButtonStyle: CSSProperties = {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#2563EB",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    height: "40px",
};


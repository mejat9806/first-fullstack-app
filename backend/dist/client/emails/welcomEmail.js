import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Body, Button, Html, Section, Text, Tailwind, } from "@react-email/components";
export default function WelcomeEmail({ name, url, }) {
    return (_jsx(Html, { style: { height: "100%", width: "100%" }, children: _jsx(Tailwind, { children: _jsx(Body, { className: " flex justify-center items-center h-full w-full m-0 p-0 font-sans", children: _jsxs(Section, { className: "flex justify-center items-center w-fit p-10 bg-slate-100 shadow-2xl rounded-2xl", children: [_jsx(Text, { className: "text-2xl font-sans font-extrabold", children: "Welcome to My App" }), _jsxs(Text, { className: "font-medium", children: ["Hi ", name] }), _jsx(Text, { className: "text-sm ", children: "This app is just a learing platform for me to build fullstack MERN project" }), _jsx(Button, { href: url, className: "bg-black text-white py-3 px-5 mt-4 rounded-md font-sans hover:bg-slate-100 hover:text-black", children: "Click me" })] }) }) }) }));
}

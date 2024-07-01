import {
  Body,
  Button,
  Html,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

export default function WelcomeEmail({
  name,
  url,
}: {
  name: string;
  url: string;
}) {
  return (
    <Html style={{ height: "100%", width: "100%" }}>
      <Tailwind>
        <Body className=" flex justify-center items-center h-full w-full m-0 p-0 font-sans">
          <Section className="flex justify-center items-center w-fit p-10 bg-slate-100 shadow-2xl rounded-2xl">
            <Text className="text-2xl font-sans font-extrabold">
              Welcome to My App
            </Text>
            <Text className="font-medium">Hi {name}</Text>
            <Text className="text-sm ">
              This app is just a learing platform for me to build fullstack MERN
              project
            </Text>
            <Button
              href={url}
              className="bg-black text-white py-3 px-5 mt-4 rounded-md font-sans hover:bg-slate-100 hover:text-black"
            >
              Click me
            </Button>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
}

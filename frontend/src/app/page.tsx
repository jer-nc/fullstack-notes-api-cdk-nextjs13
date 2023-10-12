import Image from "next/image";
import image from '../../public/assets/cdk-crud-books-nextj13.webp';
import NavbarHome from "@/components/custom/NavbarHome";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center px-12 py-28 max-w-[1200px] mx-auto">
      <NavbarHome />
      <h1 className="text-3xl font-semibold text-center">
        Next.js 13 + Cognito + API Gateway + Lambda + DynamoDB - Notes App Demo
      </h1>
      <div className="py-4">
        <p className="text-muted-foreground mt-4">
          This frontend application serves as a simple demonstration of how to interact with a backend built using AWS CDK.
        </p>
        <p className="text-muted-foreground mt-4">
          This is an updated version of the <a href="https://github.com/jer-nc/fullstack-book-crud-cdk-nextjs13" target="_blank" className="text-blue-500">Fullstack Book App</a> demo. This version is owner based, meaning that each user can only see their own data and make changes to it.
        </p>
        <p className="text-muted-foreground mt-4">
          It performs basic CRUD operations, with API Gateway methods protected by Cognito authorizers.
          Lambda functions process requests and handle data modifications in DynamoDB.
        </p>
        <p className="text-muted-foreground mt-4">
          You can find the source code <a href="https://github.com/jer-nc/fullstack-notes-api-cdk-nextjs13" target="_blank" className="text-blue-500">here</a>.
        </p>
        <div className="py-12 w-full justify-center flex">
          <Image priority width={900} height={800} src={image} style={{ width: 'auto' }} alt="next-js-cognito" />
        </div>
        <h2 className="mt-4 text-xl font-semibold">
          The application allows for the following
        </h2>
        <div className="py-4">
          <ul className="text-muted-foreground">
            <li>- Authentication with Cognito</li>
            <li>- Note creation</li>
            <li>- Note modification</li>
            <li>- Note deletion</li>
            <li>- Listing all notes and sorted by recent (GSI)</li>
            <li>- Retrieving a note by its ID.</li>
          </ul>
        </div>
        <div className="mt-8 p-4 bg-gray-200 rounded-md">
          <p className="text-center">
              Please note that this application is experimental and not production-ready.
          </p>
        </div>
      </div>
    </main>
  )
}

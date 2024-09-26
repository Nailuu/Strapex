import { Header } from "@/components/Header"

const Whitelist = () => {
    return (
        <div className="flex flex-col min-h-screen" style={{ fontFamily: 'var(--font-jua)' }}>
            <Header />
            <div className="bg-gray-100 flex-grow flex flex-col gap-2 items-center justify-center pb-8">
                <div className="mx-6 md:mx-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl text-center text-green-700">Your account was successfully created!</h2>
                    <p className="text-center text-muted-foreground text-sm md:text-md lg:text-lg">You now have to wait for Manon to give you access to the website.</p>
                </div>
            </div>
        </div>
    )
}

export default Whitelist
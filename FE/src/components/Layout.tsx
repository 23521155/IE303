import Header from '@/src/components/ui/header';
import Footer from '@/src/components/ui/footer';

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#121212] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}

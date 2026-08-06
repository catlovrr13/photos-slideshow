import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from '@/components/ui/combobox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const themeCommands = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((t) => `Switch to Theme ${t}`);
const modeCommands = ['Manual Play', 'AutoPlay', 'Random'];
const commands = [...themeCommands, ...modeCommands.map((m) => `Switch to ${m}`)];

export default function CommandBar() {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const handleKey = (e) => {
            if ((e.ctrlKey && e.key === 'k') || e.key === '/') {
                e.preventDefault();
                setOpen(true);
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    const runCommand = (item) => {
        if (item.startsWith('Switch to Theme ')) {
            const theme = item.replace('Switch to Theme ', '').toLowerCase();
            router.visit(`/theme-${theme}`);
            return;
        } else if (item === 'Switch to Manual Play') {
            localStorage.setItem('play-mode', 'Manual');
        } else if (item === 'Switch to AutoPlay') {
            localStorage.setItem('play-mode', 'Autoplay');
        } else if (item === 'Switch to Random') {
            localStorage.setItem('play-mode', 'Random');
        }
        setOpen(false);
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Select a command</DialogTitle>
                    <DialogDescription>Press ENTER to select | Press ESC to exit.</DialogDescription>
                </DialogHeader>
                <div className="m-2 w-100 p-2">
                    <Combobox items={commands} onValueChange={(value) => runCommand(value)}>
                        <ComboboxInput placeholder="Type or Select command..." />
                        <ComboboxContent>
                            <ComboboxEmpty>No Commands found.</ComboboxEmpty>
                            <ComboboxList>
                                {(item) => (
                                    <ComboboxItem key={item} value={item}>
                                        {item}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                </div>
            </DialogContent>
        </Dialog>
    );
}

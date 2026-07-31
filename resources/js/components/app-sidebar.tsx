import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { CameraIcon, ImageIcon, LayoutGrid, SlidersIcon } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Upload Images',
        url: '/upload-photos',
        icon: CameraIcon,
    },
    {
        title: 'Theme A',
        url: '/theme-a',
        icon: ImageIcon,
    },
    {
        title: 'Theme B',
        url: '/theme-b',
        icon: ImageIcon,
    },
    {
        title: 'Theme C',
        url: '/theme-c',
        icon: ImageIcon,
    },
    {
        title: 'Theme D',
        url: '/theme-d',
        icon: ImageIcon,
    },
    {
        title: 'Theme E',
        url: '/theme-e',
        icon: ImageIcon,
    },
    {
        title: 'Theme F',
        url: '/theme-f',
        icon: ImageIcon,
    },
    {
        title: 'Theme G',
        url: '/theme-g',
        icon: ImageIcon,
    },
    {
        title: 'Theme H',
        url: '/theme-h',
        icon: ImageIcon,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/theme-a" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

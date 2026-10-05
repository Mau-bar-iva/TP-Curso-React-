import {
    Menu,
    Search,
    X,
    User,
    ShoppingCart,
    Heart,
    ChevronLeft,
    ChevronRight,
    Trash2,
    Lock,
    Truck,
    Loader,
    ShoppingBag,
    LogOut,
    ChevronDown,
} from 'lucide-react';

export const IconMenu = ({ className = 'h-5 w-5', ...rest }) => <Menu className={className} {...rest} />;
export const IconSearch = ({ className = 'h-5 w-5', ...rest }) => <Search className={className} {...rest} />;
export const IconX = ({ className = 'h-5 w-5', ...rest }) => <X className={className} {...rest} />;
export const IconUser = ({ className = 'h-5 w-5', ...rest }) => <User className={className} {...rest} />;
export const IconShoppingCart = ({ className = 'h-5 w-5', ...rest }) => <ShoppingCart className={className} {...rest} />;
export const IconHeart = ({ className = 'h-5 w-5', ...rest }) => <Heart className={className} {...rest} />;
export const IconChevronLeft = ({ className = 'h-5 w-5', ...rest }) => <ChevronLeft className={className} {...rest} />;
export const IconChevronRight = ({ className = 'h-5 w-5', ...rest }) => <ChevronRight className={className} {...rest} />;
export const IconTrash = ({ className = 'h-5 w-5', ...rest }) => <Trash2 className={className} {...rest} />;
export const IconLock = ({ className = 'h-5 w-5', ...rest }) => <Lock className={className} {...rest} />;
export const IconTruck = ({ className = 'h-5 w-5', ...rest }) => <Truck className={className} {...rest} />;
export const IconLoader = ({ className = 'h-5 w-5', ...rest }) => <Loader className={className} {...rest} />;
export const IconShoppingBag = ({ className = 'h-5 w-5', ...rest }) => <ShoppingBag className={className} {...rest} />;
export const IconLogOut = ({ className = 'h-5 w-5', ...rest }) => <LogOut className={className} {...rest} />;
export const IconChevronDown = ({ className = 'h-5 w-5', ...rest }) => <ChevronDown className={className} {...rest} />;

export default {
    IconMenu,
    IconSearch,
    IconX,
    IconUser,
    IconShoppingCart,
    IconHeart,
    IconChevronLeft,
    IconChevronRight,
    IconTrash,
    IconLock,
    IconTruck,
    IconLoader,
    IconShoppingBag,
    IconLogOut,
    IconChevronDown,
};

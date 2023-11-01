"use client"

import Link from "next/link"
import { useParams, usePathname, useRouter, useSearchParams} from "next/navigation"
import { Edit, ShoppingBag } from "lucide-react"
import { useShoppingCart } from "use-shopping-cart"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const path = usePathname()
  const router = useRouter()
  const {cartCount} = useShoppingCart()
  const searchParam = useSearchParams()
  const defaultSearchQuery = searchParam.get('search')??""
  if(path.startsWith('/studio')) return null

  function onSubmit (event: React.SyntheticEvent<HTMLFormElement>){
   event.preventDefault()
   const formData = new FormData(event.currentTarget)
   const searchQuery = formData.get("search")
   router.replace(`/?search=${searchQuery}`)
  }
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between space-x-4 px-6 sm:space-x-0">
        <MainNav />
        <form className="hidden items-center lg:inline-flex">
          <Input
            id="search"
            name="search"
            type="search"
            autoComplete="off"
            placeholder="Search products..."
            className="h-9 lg:w-[300px]"
            defaultValue={defaultSearchQuery}
          />
        </form>
        <div className="flex items-center space-x-1">
          <Link href="/cart">
            <Button size="sm" variant="ghost">
              <ShoppingBag className="h-5 w-5" />
              <span className="ml-2 text-sm font-bold">{cartCount}</span>
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          <ThemeToggle />
          {
            process.env.NODE_ENV === "development" && (
              <Link href='/studio'>
                <Button size="sm" variant= "ghost">
                  <Edit className = "h-5 w-5"></Edit>
                </Button>
                </Link>
            )
          }
        </div>
      </div>
    </header>
  )
}

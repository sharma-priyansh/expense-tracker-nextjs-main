import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { checkUser } from '@/lib/checkUser';

const Header = async () => {
  const user = await checkUser();

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <div className='nav-left'>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        <h2>Expense Tracker</h2>

        {/* Right spacer */}
        <div className='nav-right' aria-hidden='true' />
      </div>
    </nav>
  );
};

export default Header;

import useGetSearchParams from "hooks/useGetSearchParams";
import NavCursor from "assets/svg/NavCursor";

interface NavButtonProps {
  stopNav?: boolean;
}

const NavButton: React.FC<NavButtonProps> = (props) => {
  const { stopNav = false } = props;
  const { getAsUrlSearchParams } = useGetSearchParams();

  const handleNavClick = () => {
    const searchParams = new URLSearchParams(getAsUrlSearchParams());

    searchParams.set("nav", "start");
    searchParams.delete("canvas");

    window.location.search = searchParams.toString();
  };

  const handleStopNavClick = () => {
    const searchParams = new URLSearchParams(getAsUrlSearchParams());

    searchParams.set("nav", "stop");
    searchParams.set("canvas", "true");

    window.location.search = searchParams.toString();
  };

  if (stopNav) {
    return (
      <button
        type="button"
        onClick={handleStopNavClick}
        className="btn btn-danger rounded z-1 position-absolute"
      >
        END
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleNavClick}
      className="btn btn-success position-absolute rounded z-1"
    >
      Start <NavCursor />
    </button>
  );
};

export default NavButton;

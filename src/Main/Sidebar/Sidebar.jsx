import React from "react";
import Icon from "../Components/Icon";
import "./sidebar.css";
import logo from "../../Images/logo_vector.png";
import defaultPageStyles from "../../Styles/defaultPageStyles";

const Sidebar = (props) => {
  return (
    <div id="sidebar" style={defaultPageStyles.sidebaranimationStyle}>
      {/*Logo*/}
      <img
        src={logo}
        height="80"
        width="80"
        alt="evolve logo"
        style={{
          opacity: "0",
          marginBottom: "15px",
          animation:
            "icon-opacity-change 0.75s 0.1s cubic-bezier(.18,.87,.92,1) forwards",
        }}
      />

      {/*Home icon*/}
      <Icon
        height={30}
        width={30}
        fill={props.fillvalue === 1 ? "yes" : "no"}
        onClick={() => props.setpage(1)}
      >
        <path d="M15.2396 34.6369V29.5254C15.2395 28.2302 16.2928 27.1779 17.5974 27.1697H22.3877C23.6981 27.1697 24.7605 28.2244 24.7605 29.5254V34.622C24.7604 35.7455 25.6734 36.6585 26.8049 36.6666H30.0731C31.5994 36.6706 33.0646 36.0713 34.1453 35.0012C35.226 33.931 35.8334 32.4779 35.8334 30.9625V16.4431C35.8333 15.219 35.2868 14.0579 34.341 13.2725L23.2383 4.45712C21.2975 2.91521 18.5256 2.96502 16.6423 4.57565L5.77837 13.2725C4.78792 14.0347 4.19594 15.1993 4.16669 16.4431V30.9477C4.16669 34.1062 6.74566 36.6666 9.92698 36.6666H13.1205C13.6653 36.6706 14.1892 36.4585 14.5758 36.0774C14.9625 35.6963 15.1799 35.1778 15.1799 34.6369H15.2396Z" />
      </Icon>

      {/*Search icon*/}
      <Icon
        height={30}
        width={30}
        fill={props.fillvalue === 2 ? "yes" : "no"}
        onClick={() => props.setpage(2)}
      >
        <ellipse
          cx="19.611"
          cy="19.611"
          rx="14.9809"
          ry="14.9809"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M30.0305 30.8085L35.9039 36.6667"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Icon>

      {/*Markets Icon*/}
      <Icon
        height={30}
        width={30}
        fill={props.fillvalue === 3 ? "yes" : "no"}
        onClick={() => props.setpage(3)}
      >
        {props.fillvalue !== 3 ? (
          <>
            <path
              d="M12.3766 25.2517L17.4899 18.606L23.3224 23.1876L28.3262 16.7296"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <ellipse
              cx="34.1588"
              cy="7.17539"
              rx="3.28375"
              ry="3.28375"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M25.496 5.33023H13.0803C7.93572 5.33023 4.74579 8.97363 4.74579 14.1182V27.9256C4.74579 33.0701 7.87317 36.6979 13.0803 36.6979H27.779C32.9235 36.6979 36.1134 33.0701 36.1134 27.9256V15.9008"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        ) : (
          <>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M30.0646 7.7175C30.0646 5.39 31.9546 3.5 34.2821 3.5C36.6096 3.5 38.4996 5.39 38.4996 7.7175C38.4996 10.045 36.6096 11.935 34.2821 11.935C31.9546 11.935 30.0646 10.045 30.0646 7.7175ZM23.327 25.8288L28.3845 19.303L28.3145 19.338C28.5945 18.953 28.647 18.463 28.4545 18.0255C28.2637 17.588 27.842 17.2905 27.3887 17.2555C26.9145 17.203 26.4437 17.413 26.162 17.798L21.9287 23.2755L17.0795 19.4605C16.782 19.233 16.432 19.1438 16.082 19.1805C15.7337 19.233 15.4187 19.4238 15.207 19.7038L10.0287 26.443L9.92196 26.6005C9.62446 27.1588 9.76446 27.8763 10.2895 28.263C10.5345 28.4205 10.797 28.5255 11.0945 28.5255C11.4987 28.543 11.882 28.3313 12.127 28.0005L16.5195 22.3463L21.507 26.093L21.6645 26.1963C22.2245 26.4938 22.9245 26.3555 23.327 25.8288ZM27.0369 6.61552C26.9669 7.05302 26.9319 7.49052 26.9319 7.92802C26.9319 11.8655 30.1169 15.0488 34.0369 15.0488C34.4744 15.0488 34.8944 14.998 35.3319 14.928V29.0488C35.3319 34.983 31.8319 38.5005 25.8819 38.5005H12.9512C6.99945 38.5005 3.49945 34.983 3.49945 29.0488V16.1005C3.49945 10.1505 6.99945 6.61552 12.9512 6.61552H27.0369Z"
              fill="white"
            />
          </>
        )}
      </Icon>

      {/*Notes Icon*/}
      <Icon
        height={30}
        width={30}
        fill={props.fillvalue === 4 ? "yes" : "no"}
        onClick={() => props.setpage(4)}
      >
        {props.fillvalue !== 4 ? (
          <>
            <path
              d="M27.5034 28.391H14.8683"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M27.5034 21.0646H14.8683"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.6898 13.7552H14.8685"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M27.84 4.81215C27.84 4.81215 14.4053 4.81915 14.3843 4.81915C9.55429 4.8489 6.56354 8.0269 6.56354 12.8744V28.9674C6.56354 33.8394 9.57704 37.0297 14.449 37.0297C14.449 37.0297 27.882 37.0244 27.9048 37.0244C32.7348 36.9947 35.7273 33.8149 35.7273 28.9674V12.8744C35.7273 8.0024 32.712 4.81215 27.84 4.81215Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        ) : (
          <>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.6675 3.5H28.3342C33.74 3.5 36.75 6.615 36.75 11.9525V30.03C36.75 35.455 33.74 38.5 28.3342 38.5H13.6675C8.3475 38.5 5.25 35.455 5.25 30.03V11.9525C5.25 6.615 8.3475 3.5 13.6675 3.5ZM14.14 11.655V11.6375H19.3708C20.125 11.6375 20.7375 12.25 20.7375 13.0007C20.7375 13.7725 20.125 14.385 19.3708 14.385H14.14C13.3858 14.385 12.775 13.7725 12.775 13.02C12.775 12.2675 13.3858 11.655 14.14 11.655ZM14.14 22.295H27.86C28.6125 22.295 29.225 21.6825 29.225 20.93C29.225 20.1775 28.6125 19.5633 27.86 19.5633H14.14C13.3858 19.5633 12.775 20.1775 12.775 20.93C12.775 21.6825 13.3858 22.295 14.14 22.295ZM14.14 30.2925H27.86C28.5583 30.2225 29.085 29.6258 29.085 28.9275C29.085 28.21 28.5583 27.615 27.86 27.545H14.14C13.615 27.4925 13.1075 27.7375 12.8275 28.1925C12.5475 28.63 12.5475 29.2075 12.8275 29.6625C13.1075 30.1 13.615 30.3625 14.14 30.2925Z"
              fill="white"
            />
          </>
        )}
      </Icon>
    </div>
  );
};

export default Sidebar;

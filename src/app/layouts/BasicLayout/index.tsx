"use client";
import {
  GithubFilled,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Divider, Dropdown, Input, theme } from "antd";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { menus } from "../../../../config/menu";
import GlobalFooter from "@/app/components/GlobalFooter";
import Image from "next/image";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import { RootState } from "@/stores";
import { useSelector } from "react-redux";

const MenuCard = () => {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Divider
        style={{
          height: "1.5em",
        }}
        type="vertical"
      />
    </div>
  );
};

const SearchInput = () => {
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
        }}
        prefix={<SearchOutlined />}
        placeholder="搜索题目"
        variant="borderless"
      />
    </div>
  );
};

interface Props {
  children: React.ReactNode;
}

/**
 * 通用布局
 * @param children
 * @constructor
 */
export default function BasicLayout({ children }: Props) {
  listQuestionBankVoByPageUsingPost({}).then((res) => {
    console.log(res);
  });
  const pathname = usePathname();
  const loginUser = useSelector((state: RootState) => state.loginUser);

  return (
    <div
      id="basicLayout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProLayout
        title="面试宝刷题平台"
        layout="top"
        logo={
          <Image
            src="/assets/logo.png"
            height={32}
            width={32}
            alt="面试宝刷题网站"
          />
        }
        location={{
          pathname,
        }}
        avatarProps={{
          src: loginUser.userAvatar || "/assets/logo.png",
          size: "small",
          title: loginUser.userName || "李明",
          render: (props, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            <SearchInput key="search" />,
            <a
              key="github"
              // href="https://github.com/liyupi/mianshiya-next"
              // target="_blank"
            >
              <GithubFilled key="GithubFilled" />
            </a>,
          ];
        }}
        headerTitleRender={(logo, title) => {
          return (
            <a
              href="/" // 点击跳转到首页
              // style={{ display: 'flex', alignItems: 'center', color: 'inherit' }}
            >
              {logo}
              {title}
            </a>
          );
        }}
        // 渲染底部栏
        footerRender={() => {
          return <GlobalFooter />;
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        // 定义有哪些菜单
        menuDataRender={() => {
          return menus;
        }}
        // 定义了菜单项如何渲染
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/"} target={item.target}>
            {dom}
          </Link>
        )}
      >
        {children}
      </ProLayout>
    </div>
  );
}

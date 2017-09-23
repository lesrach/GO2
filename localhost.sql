-- phpMyAdmin SQL Dump
-- version 2.11.2.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2017 年 09 月 22 日 05:33
-- 服务器版本: 5.0.45
-- PHP 版本: 5.2.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- 数据库: `lesrach`
--
CREATE DATABASE `lesrach` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `lesrach`;

-- --------------------------------------------------------

--
-- 表的结构 `chat`
--

CREATE TABLE `chat` (
  `id` int(11) NOT NULL auto_increment,
  `nickname` varchar(100) collate utf8_unicode_ci NOT NULL,
  `message` varchar(255) collate utf8_unicode_ci NOT NULL,
  `ip` varchar(50) collate utf8_unicode_ci default '0.0.0.0',
  `createtime` timestamp NULL default CURRENT_TIMESTAMP,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=23 ;

--
-- 导出表中的数据 `chat`
--

INSERT INTO `chat` (`id`, `nickname`, `message`, `ip`, `createtime`) VALUES
(19, '阿萨德', 'woshisb', '127.0.0.1', '2017-08-29 20:21:28'),
(20, '阿萨德', '123123123', '127.0.0.1', '2017-08-29 20:21:42'),
(21, '阿萨德', '1111111111111', '127.0.0.1', '2017-08-29 20:21:46'),
(22, '阿萨德', 'asdasdasdasd', '127.0.0.1', '2017-08-29 20:22:09');

-- --------------------------------------------------------

--
-- 表的结构 `wodesql`
--

CREATE TABLE `wodesql` (
  `id` int(11) NOT NULL auto_increment,
  `username` varchar(50) collate utf8_unicode_ci NOT NULL,
  `password` varchar(50) collate utf8_unicode_ci NOT NULL,
  `qq` varchar(50) collate utf8_unicode_ci NOT NULL,
  `email` varchar(50) collate utf8_unicode_ci NOT NULL,
  `phone` varchar(50) collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=28 ;

--
-- 导出表中的数据 `wodesql`
--

INSERT INTO `wodesql` (`id`, `username`, `password`, `qq`, `email`, `phone`) VALUES
(1, 'xiaoming', 'asd1234', '', '', ''),
(2, 'asdasd', 'dddddd', '', '', ''),
(4, 'asd', 'asd', '', '', ''),
(5, 'xiaoming', 'aa', '', '', ''),
(13, '123321', 'zzzzzzz', '', '', ''),
(14, '123321', 'zzzzzzz', '', '', ''),
(15, 'zzzzzzzz', 'qqqqqqqqqqq', '', '', ''),
(16, 'lesrach', '3956509', '123456789', '123456789@qq.com', '13312345678'),
(17, 'lesrach', '3956509', '123456789', '', '13312345678'),
(18, 'lesrach', '3956509', '123456789', '', '13312345678'),
(19, 'lesrach', '3956509', '123456789', '', '13312345678'),
(20, 'lesrach', '3956509', '123456789', '', '13312345678'),
(21, 'lesrach', '3956509', '1324987897', '', '13334567984'),
(22, 'lesrach', '3956509', '1324987897', '', '13334567984'),
(23, 'lesrach', '3956509', '1324987897', '', '13334567984'),
(24, '', '', '', '', ''),
(25, '', '', '', '', ''),
(26, 'asd', '3956509', '1234657', '', '13312346578'),
(27, '', '', '', '', '');
